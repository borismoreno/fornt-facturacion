import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { startLimpiarSeleccion } from '../../../actions/clientes';
import { startObtenerDatosEmpresa } from '../../../actions/configuracion';
import { BuscarCliente } from '../../clientes/BuscarCliente';
import { SeleccionFecha } from '../../ui/SeleccionFecha';

const clienteInicial = {
    razonSocial: '',
    direccion: '',
    mail: ''
}

const RetencionScreen = () => {
    const wrapperRef = useRef(null);
    const dispatch = useDispatch();
    const { empresa } = useSelector(state => state.configuracion);
    const { empresaId } = useSelector(state => state.auth);
    const [formValues, setFormValues] = useState(clienteInicial);
    const [numeroIdentificacion, setNumeroIdentificacion] = useState('');
    const [fechaEmision, setFechaEmision] = useState(new Date());
    const [display, setDisplay] = useState(false);
    const { razonSocial, direccion, mail } = formValues;
    const pad = '000000000';

    const handleChange = (e) => {
        setNumeroIdentificacion(e.target.value);
        dispatch(startLimpiarSeleccion());
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
    }, [dispatch, empresaId]);
    return (
        <div className='container mx-auto mb-6'>
            <div className="flex justify-between py-2 px-3 bg-gray-200 rounded-md rounded-b-none">
                <h2 className="text-2xl font-bold mt-1 tracking-wider uppercase">Retención</h2>
                <div className="">
                    <div className="relative inline-block">
                        <NavLink
                            className="flex items-center p-2 hover:bg-gray-100 focus:outline-none text-blue-400"
                            to="/retenciones"
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
                </div>
                <div className="w-10/12 md:w-5/12 mb-5 ">
                    <div className="mb-10">
                        <label
                            className="text-xs font-bold"
                        >Número Retención</label>
                        <p
                            className="w-full border-b-2 pb-1 border-gray-200 focus:outline-none focus:border-indigo-300 mt-2 text-sm"
                        >{empresa?
                                    `${empresa.establecimiento}-${empresa.puntoEmision}-${pad.substring(0, pad.length - empresa.secuencialRetencion.length) + empresa.secuencialRetencion}`
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
                    {/* <div className="mb-10">
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
                            { formasPago && formasPago.map(item => (
                              <option key={item._id} value={item.codigo}>{item.formaPago}</option>
                          )) }
                        </select>
                    </div> */}
                </div>
            </div>
            <div className="border-gray-200 border-2 rounded-md">
                <p>Documento Sustento</p>
            </div>
        </div>
    )
}

export default RetencionScreen;
