import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startObtenerClientes, startBuscarCliente, startLimpiarSeleccion } from '../../actions/clientes';
import { startObtenerDatosEmpresa, startObtenerFormasPago } from '../../actions/configuracion';
import { startActualizarAdicionales, startActualizarDetallesFactura, startEmitirFactura, startLimpiarDatosFactura } from '../../actions/factura';
import { calcularImpuestosDetalle } from '../../helpers/calculos';
import { BuscarCliente } from '../clientes/BuscarCliente';
import { NuevaFormaPago } from '../modals/NuevaFormaPago';
import { NuevoAdicional } from '../modals/NuevoAdicional';
import { NuevoDetalle } from '../modals/NuevoDetalle';
import { SeleccionFecha } from '../ui/SeleccionFecha';
import { Tabla } from '../ui/Tabla';
import { ValoresFactura } from './ValoresFactura';
import { startMostrarCargandoAlerta, startMostrarError } from '../../actions/alerta';
import { Cargando } from '../ui/Cargando';
import { ImprimirComprobante } from '../modals/ImprimirComprobante';
import { NavLink } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';

const clienteInicial = {
    razonSocial: '',
    direccion: '',
    mail: '',
    telefono: ''
}

const headersDetalle = [
    'Producto',
    'Cantidad',
    'Precio Unitario',
    'Descuento',
    'Subtotal',
    ''
]

const headersAdicional = [
    'Nombre',
    'Valor',
    ''
]

export const FacturaScreen = ({ history }) => {
    const [formValores, handleInputChangeSelect] = useForm({
        formaPago: ''
    });
    const { formaPago } = formValores;
    const dispatch = useDispatch();
    const wrapperRef = useRef(null);
    const [numeroIdentificacion, setNumeroIdentificacion] = useState('');
    const [mostrarNuevoDetalle, setMostrarNuevoDetalle] = useState(false);
    const [mostrarNuevoAdicional, setMostrarNuevoAdicional] = useState(false);
    const [mostrarNuevaFormaPago, setMostrarNuevaFormaPago] = useState(false);
    const [remarcar, setRemarcar] = useState(false);
    const [display, setDisplay] = useState(false);
    const [formValues, setFormValues] = useState(clienteInicial);
    const [datosDetalles, setDatosDetalles] = useState([]);
    const [subtotalFormaPago] = useState(0.00);
    const [valorPendiente, setValorPendiente] = useState(0.00);
    const [fechaEmision, setFechaEmision] = useState(new Date());
    const { clienteSeleccionado } = useSelector(state => state.clientes);
    const { empresaId } = useSelector(state => state.auth);
    const { empresa, formasPago } = useSelector(state => state.configuracion);
    const { detallesFactura, adicionalesFactura, valoresFactura, claveAcceso } = useSelector(state => state.factura);
    const { mostrarCargando } = useSelector(state => state.alerta);
    const { razonSocial, direccion, mail, telefono } = formValues;
    const {
        subtotalDoce,
        subtotalCero,
        subtotalNoIva,
        subtotalExento,
        subtotalSinImpuestos,
        totalIva,
        valorTotal
    } = valoresFactura;
    const pad = '000000000';

    useEffect(() => {
        const obtenerDetalles = () => {
            if (detallesFactura.length > 0) {
                setDatosDetalles(detallesFactura.map(detalle => (
                    {
                        descripcion: detalle.descripcion,
                        cantidad: detalle.cantidad,
                        precio: detalle.valorUnitario.toFixed(2),
                        descuento: detalle.descuento ? detalle.descuento.toFixed(2) + ' %' : '0 %',
                        subtotal: detalle.subtotal.toFixed(2)
                    }
                )));
            } else {
                setDatosDetalles([]);
            }
        }
        obtenerDetalles();
    }, [detallesFactura]);

    useEffect(() => {
        dispatch(startObtenerClientes());
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [dispatch]);

    const handleChange = (e) => {
        setNumeroIdentificacion(e.target.value);
        dispatch(startLimpiarSeleccion());
    }
    useEffect(() => {
        dispatch(startBuscarCliente(numeroIdentificacion));
    }, [numeroIdentificacion, dispatch])

    useEffect(() => {
        if (clienteSeleccionado) {
            setFormValues({
                razonSocial: clienteSeleccionado.razonSocial,
                direccion: clienteSeleccionado.direccion,
                mail: clienteSeleccionado.mail,
                telefono: clienteSeleccionado.telefono
            })
            setNumeroIdentificacion(clienteSeleccionado.numeroIdentificacion);
            setDisplay(false);
        } else {
            setFormValues(clienteInicial);
        }
    }, [clienteSeleccionado, setFormValues])

    useEffect(() => {
        dispatch(startObtenerFormasPago());
    }, [dispatch])

    const handleClickOutside = event => {
        const { current: wrap } = wrapperRef;
        if (wrap && !wrap.contains(event.target)) {
            setDisplay(false);
        }
    }

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const handleEliminarDetalle = (index) => {
        dispatch(startActualizarDetallesFactura(detallesFactura.filter((item, i) => {
            return index !== i
        })));
    }

    const handleEliminarAdicional = (index) => {
        dispatch(startActualizarAdicionales(adicionalesFactura.filter((item, i) => {
            return index !== i
        })));
    }

    const handleEmitirFactura = () => {
        let dd = fechaEmision.getDate();
        let mm = fechaEmision.getMonth() + 1; //January is 0!
        let yyyy = fechaEmision.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }

        const fechaEnvio = yyyy + '-' + mm + '-' + dd;
        let impuestosDetalle = [];
        if (subtotalDoce > 0) {
            impuestosDetalle.push(calcularImpuestosDetalle(subtotalDoce, totalIva, '2', '0.00'));
        }
        if (subtotalCero > 0) {
            impuestosDetalle.push(calcularImpuestosDetalle(subtotalCero, '0.00', '0', '0.00'));
        }
        if (subtotalNoIva > 0) {
            impuestosDetalle.push(calcularImpuestosDetalle(subtotalNoIva, '0.00', '6', '0.00'));
        }
        if (subtotalExento > 0) {
            impuestosDetalle.push(calcularImpuestosDetalle(subtotalExento, '0.00', '7', '0.00'));
        }
        detallesFactura.map(detalle => {
            return detalle.descripcion = detalle.descripcion.replace(/(\r\n|\n|\r)/gm, " ");
        });
        if (!clienteSeleccionado) {
            dispatch(startMostrarError('Debe seleccionar un cliente.'));
            return;
        } else if (detallesFactura.length === 0) {
            dispatch(startMostrarError('No existen detalles a facturar.'));
            return;
        } else if (formaPago === '') {
            dispatch(startMostrarError('Seleccione la forma de pago.'));
            setRemarcar(true);
            return;
        }
        setRemarcar(false);
        let formasDePago = [{
            tipoFormaPago: formaPago,
            valorPago: valorTotal.toFixed(2),
            plazo: '0',
            tipoPlazo: 'DIAS',
        }]
        let clienteEnviar = clienteSeleccionado;
        clienteEnviar.direccion = direccion;
        clienteEnviar.razonSocial = razonSocial;
        clienteEnviar.mail = mail;
        clienteEnviar.telefono = telefono;
        dispatch(startMostrarCargandoAlerta());
        dispatch(startEmitirFactura({
            cliente: clienteEnviar,
            fechaEmision: fechaEnvio,
            empresa,
            impuestosDetalle,
            detalles: detallesFactura,
            formasPago: formasDePago,
            datosAdicionales: adicionalesFactura,
            detalleValores: {
                totalSinImpuestos: subtotalSinImpuestos.toFixed(2),
                totalDescuento: '0.00',
                totalIva: totalIva.toFixed(2),
                importeTotal: valorTotal.toFixed(2)
            }
        }));
    }

    useEffect(() => {
        setValorPendiente((valorTotal - subtotalFormaPago).toFixed(2));
    }, [subtotalFormaPago, valorTotal]);

    useEffect(() => {
        setNumeroIdentificacion('');
        dispatch(startObtenerDatosEmpresa(empresaId));
        dispatch(startLimpiarSeleccion());
        dispatch(startLimpiarDatosFactura());
    }, [dispatch, empresaId]);

    return (
        <div
            className="container mx-auto mb-6"
        >
            <div className="flex justify-between py-2 px-3 bg-gray-200 rounded-md rounded-b-none">
                <h2 className="text-2xl font-bold mt-1 tracking-wider uppercase">Factura</h2>
                <div className="">
                    <div className="relative inline-block">
                        <NavLink
                            className="flex items-center p-2 hover:bg-gray-100 focus:outline-none text-blue-400"
                            to="/emitidas"
                        >
                            <i className="fas fa-arrow-circle-left mr-2"></i>
                            <p className="">Regresar al listado</p>
                        </NavLink>
                    </div>
                </div>
            </div>

            <div className="flex flex-col flex-wrap md:flex-row mb-8 justify-between px-4 py-2 border-gray-200 border-l-2 border-b-2 border-r-2 rounded-md rounded-t-none text-left">
                <div
                    className="w-10/12 md:w-5/12"
                >
                    <div
                        className="mb-10"
                        ref={wrapperRef}
                    >
                        <label
                            htmlFor="numeroIdentificacion"
                            className="text-xs font-bold"
                        >Identificación</label>
                        <input
                            id="numeroIdentificacion"
                            className="w-full border-b-2 pb-1 border-gray-200 focus:outline-none focus:border-indigo-300 mt-2 text-sm"
                            placeholder="Ingrese la identificación"
                            name="numeroIdentificacion"
                            value={numeroIdentificacion}
                            onChange={handleChange}
                            onFocus={() => setDisplay(true)}
                            autoComplete="off"
                        />
                        {display &&
                            <BuscarCliente
                            />
                        }
                    </div>
                    <div className="mb-10">
                        <label
                            htmlFor="razonSocial"
                            className="text-xs font-bold"
                        >Nombre</label>
                        <input
                            id="razonSocial"
                            className="w-full border-b-2 pb-1 border-gray-200 focus:outline-none focus:border-indigo-300 mt-2 text-sm"
                            autoComplete="off"
                            name="razonSocial"
                            value={razonSocial}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-10">
                        <label
                            htmlFor="direccion"
                            className="text-xs font-bold"
                        >Dirección</label>
                        <input
                            id="direccion"
                            className="w-full border-b-2 pb-1 border-gray-200 focus:outline-none focus:border-indigo-300 mt-2 text-sm"
                            autoComplete="off"
                            name="direccion"
                            value={direccion}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-10">
                        <label
                            htmlFor="mail"
                            className="text-xs font-bold"
                        >Email</label>
                        <input
                            id="mail"
                            className="w-full border-b-2 pb-1 border-gray-200 focus:outline-none focus:border-indigo-300 mt-2 text-sm"
                            autoComplete="off"
                            name="mail"
                            value={mail}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-10">
                        <label
                            htmlFor="telefono"
                            className="text-xs font-bold"
                        >Teléfono</label>
                        <input
                            id="telefono"
                            className="w-full border-b-2 pb-1 border-gray-200 focus:outline-none focus:border-indigo-300 mt-2 text-sm"
                            autoComplete="off"
                            name="telefono"
                            value={telefono}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="w-10/12 md:w-5/12 mb-5 ">
                    <div className="mb-10">
                        <label
                            className="text-xs font-bold"
                        >Número Factura</label>
                        <p
                            className="w-full border-b-2 pb-1 border-gray-200 focus:outline-none focus:border-indigo-300 mt-2 text-sm"
                        >{empresa ?
                            `${empresa.establecimiento}-${empresa.puntoEmision}-${pad.substring(0, pad.length - empresa.secuencialFactura.length) + empresa.secuencialFactura}`
                            : null}</p>
                    </div>
                    <div className="mb-10 flex justify-between flex-col">
                        <label
                            htmlFor="fechaEmision"
                            className="text-xs font-bold"
                        >Fecha Emisión</label>
                        <SeleccionFecha
                            startDate={fechaEmision}
                            setStartDate={setFechaEmision}
                        />
                    </div>
                    <div className="mb-10">
                        <label
                            htmlFor="formaPago"
                            className="text-xs font-bold"
                        >Forma de Pago</label>
                        <select
                            className={"w-full pb-1 mt-2 text-sm border-b-2 border-gray-200 focus:outline-none focus:border-indigo-300 focus:shadow-lg" +
                                ((remarcar && formaPago === '') ? ' border-2 border-red-400' : '')
                            }
                            name="formaPago"
                            value={formaPago}
                            onChange={handleInputChangeSelect}
                        >
                            <option value=''>--SELECCIONE--</option>
                            {formasPago && formasPago.map(item => (
                                <option key={item._id} value={item.codigo}>{item.formaPago}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className="border-gray-200 border-2 rounded-md">
                <Tabla
                    titulo="Detalles Factura"
                    data={datosDetalles}
                    headers={headersDetalle}
                    handleEliminar={handleEliminarDetalle}
                />
                <button
                    className="flex items-center p-2 hover:bg-gray-100 focus:outline-none text-blue-400"
                    onClick={() => setMostrarNuevoDetalle(true)}
                >
                    <i className="fas fa-plus-circle mr-2"></i>
                    <p className="">Agregar Detalle</p>
                </button>
            </div>
            <div className="flex flex-col flex-wrap md:flex-row mb-8 justify-between text-left mt-4">
                <div className="w-10/12 md:w-6/12 border-gray-200 border-2 rounded-md">
                    <Tabla
                        headers={headersAdicional}
                        data={adicionalesFactura}
                        handleEliminar={handleEliminarAdicional}
                    />
                    <button
                        className="flex items-center p-2 hover:bg-gray-100 focus:outline-none text-blue-400"
                        onClick={() => setMostrarNuevoAdicional(true)}
                    >
                        <i className="fas fa-plus-circle mr-2"></i>
                        <p className="">Agregar Valor Adicional</p>
                    </button>
                </div>
                <div className="w-10/12 md:w-5/12 border-gray-200 border-2 rounded-md pt-2">
                    <ValoresFactura
                    />
                </div>
            </div>
            <div className="flex justify-center">
                <button
                    className="bg-blue-500 uppercase rounded-3xl py-3 px-8 text-white mr-4 focus:outline-none"
                    onClick={handleEmitirFactura}
                >Enviar</button>
                <NavLink
                    className="bg-red-500 uppercase rounded-3xl py-3 px-8 text-white focus:outline-none"
                    to="/emitidas"
                >Cancelar</NavLink>
            </div>
            {
                mostrarNuevoDetalle &&
                <>
                    <NuevoDetalle
                        setShowModal={setMostrarNuevoDetalle}
                    />
                </>
            }
            {
                mostrarNuevoAdicional &&
                <>
                    <NuevoAdicional
                        setShowModal={setMostrarNuevoAdicional}
                    />
                </>
            }
            {
                mostrarNuevaFormaPago &&
                <>
                    <NuevaFormaPago
                        setShowModal={setMostrarNuevaFormaPago}
                        valorInicial={Number(valorPendiente)}
                    />
                </>
            }
            {
                mostrarCargando && <Cargando />
            }
            {
                claveAcceso && <ImprimirComprobante claveAcceso={claveAcceso} history={history} tipoComprobante='factura' />
            }
        </div>
    )
}
