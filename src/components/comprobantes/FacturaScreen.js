import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startObtenerClientes, startBuscarCliente, startLimpiarSeleccion } from '../../actions/clientes';
import { startObtenerDatosEmpresa } from '../../actions/configuracion';
import { startLimpiarDatosFactura } from '../../actions/factura';
import { BuscarCliente } from '../clientes/BuscarCliente';
import { NuevoDetalle } from '../modals/NuevoDetalle';
import { SeleccionFecha } from '../ui/SeleccionFecha';
import { Tabla } from '../ui/Tabla';
import { ValoresFactura } from './ValoresFactura';

const clienteInicial = {
    razonSocial: '',
    direccion: '',
    mail: ''
}

const headersDetalle = [
    'Producto',
    'Cantidad',
    'Precio Unitario',
    'Descuento',
    'Subtotal'
]

export const FacturaScreen = () => {
    const dispatch = useDispatch();
    const wrapperRef = useRef(null);
    const [numeroIdentificacion, setNumeroIdentificacion] = useState('');
    const [mostrarNuevoDetalle, setMostrarNuevoDetalle] = useState(false);
    const [display, setDisplay] = useState(false);
    const [formValues, setFormValues] = useState(clienteInicial);
    const [datosDetalles, setDatosDetalles] = useState([]);
    const { clienteSeleccionado } = useSelector(state => state.clientes);
    const { empresaId } = useSelector(state => state.auth);
    const { empresa } = useSelector(state => state.configuracion);
    const { detallesFactura } = useSelector(state => state.factura);
    const { razonSocial, direccion, mail } = formValues;
    const pad = '000000000';

    useEffect(() => {
        const obtenerDetalles = () => {
            if ( detallesFactura.length > 0 ) {
                detallesFactura.map(detalle => {
                    setDatosDetalles([
                        ...datosDetalles,
                        {
                            descripcion: detalle.descripcion,
                            cantidad: detalle.cantidad,
                            precio: detalle.precio.toFixed(2),
                            descuento: detalle.descuento ? detalle.descuento.toFixed(2) + ' %' : '0 %',
                            subtotal: detalle.subtotal.toFixed(2)
                        }
                    ]);
                    return detalle;
                })
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
        if ( clienteSeleccionado ) {
            setFormValues({
                razonSocial: clienteSeleccionado.razonSocial,
                direccion: clienteSeleccionado.direccion,
                mail: clienteSeleccionado.mail
            })
            setNumeroIdentificacion(clienteSeleccionado.numeroIdentificacion);
            setDisplay(false);
        } else {
            setFormValues(clienteInicial);
        }
    }, [clienteSeleccionado, setFormValues])

    const handleClickOutside = event => {
        const {current: wrap} = wrapperRef;
        if (wrap && !wrap.contains(event.target)) {
            setDisplay(false);
        }
    }

    const handleInputChange = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    useEffect(() => {
        setNumeroIdentificacion('');
        dispatch(startObtenerDatosEmpresa(empresaId));
        dispatch(startLimpiarSeleccion());
        dispatch(startLimpiarDatosFactura());
    }, [dispatch, empresaId]);
    return (
        <div
            className="container mx-auto"
        >
            <div className="flex justify-between">
                <h2 className="text-2xl font-bold mb-6 pb-2 tracking-wider uppercase">Factura</h2>
                <div>
                    <div className="relative mr-4 inline-block">
                        {/* <i className="fas fa-print"></i> */}
                    </div>
                </div>
            </div>

            <div className="flex flex-col flex-wrap md:flex-row mb-8 justify-between text-left">
                <div 
                    className="w-10/12 md:w-5/12 mb-5" 
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
                </div>
                <div className="w-10/12 md:w-5/12 mb-5 ">
                    <div className="mb-10">
                        <label
                            className="text-xs font-bold"
                        >Número Factura</label>
                        <p
                            className="w-full border-b-2 pb-1 border-gray-200 focus:outline-none focus:border-indigo-300 mt-2 text-sm"
                        >{empresa?
                                    `${empresa.establecimiento}-${empresa.puntoEmision}-${pad.substring(0, pad.length - empresa.secuencialFactura.length) + empresa.secuencialFactura}`
                                    : null}</p>
                    </div>
                    <div className="mb-10 flex justify-between flex-col">
                        <label
                            htmlFor="fechaEmision"
                            className="text-xs font-bold"
                        >Fecha Emisión</label>
                        <SeleccionFecha />
                    </div>
                </div>
            </div>
            <div className="border-gray-200 border-2 rounded-md">
                <Tabla 
                    titulo="Detalles Factura"
                    data={datosDetalles}
                    headers={headersDetalle}
                />
                <button
                    className="flex items-center p-2 hover:bg-gray-100 focus:outline-none"
                    onClick={() => setMostrarNuevoDetalle(true)}
                >
                    <i className="fas fa-plus-circle mr-2"></i>
                    <p className="">Agregar Detalle</p>
                </button>
            </div>
            <div className="flex flex-col flex-wrap md:flex-row mb-8 justify-between text-left mt-4">
                <div className="w-10/12 md:w-5/12 mb-5" >
                    Div 1
                </div>
                <div className="w-10/12 md:w-5/12 mb-5 ">
                    <ValoresFactura
                    />
                </div>
            </div>
            {
                mostrarNuevoDetalle && 
                <>
                    <div 
                        className="justify-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        // onClick={() => setShowModal(false)}
                    >
                        <NuevoDetalle
                            setShowModal={setMostrarNuevoDetalle}
                        />
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            }
        </div>
    )
}
