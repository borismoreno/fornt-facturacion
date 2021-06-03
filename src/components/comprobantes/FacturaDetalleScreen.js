import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import { startObtenerDetallesFactura } from '../../actions/comprobante';

export const FacturaDetalleScreen = () => {
    const { comprobantesEmitidos, detallesComprobante } = useSelector(state => state.comprobante);
    const dispatch = useDispatch();
    const params = useParams();
    const { id } = params;
    const elemento = comprobantesEmitidos.find(item => item._id === id);
    useEffect(() => {
        dispatch(startObtenerDetallesFactura(id));
    }, [dispatch, id]);
    if (!elemento) {
        return <p>Error al consultar el comprobante</p>
    }

    const obtenerFecha = (fecha) => {
        const division = fecha.split('/');
        let mes = '';
        switch (division[1]) {
            case '01':
                mes = 'Enero'
                break;
            case '02':
                mes = 'Febrero'
                break;
            case '03':
                mes = 'Marzo'
                break;
            case '04':
                mes = 'Abril'
                break;
            case '05':
                mes = 'Mayo'
                break;
            case '06':
                mes = 'Junio'
                break;
            case '07':
                mes = 'Julio'
                break;
            case '08':
                mes = 'Agosto'
                break;
            case '09':
                mes = 'Septiembre'
                break;
            case '10':
                mes = 'Octubre'
                break;
            case '11':
                mes = 'Noviembre'
                break;
            case '12':
                mes = 'Diciembre'
                break;
            default:
                break;
        }
        return `${mes} ${division[0]}, ${division[2]}`;
    }
    const obtenerValorEstado = (valor) => {
        let estado = '';
        switch (valor) {
            case 'PPR':
                estado = 'POR PROCESAR'
                break;
            case 'AUT':
                estado = 'AUTORIZADO'
                break;
            case 'NAT':
                estado = 'NO AUTORIZADO'
                break;
            case 'REC':
                estado = 'RECIBIDA'
                break;
            case 'EMA':
                estado = 'PROCESADA'
                break;
            case 'DEV':
                estado = 'DEVUELTA'
                break;
            case 'ANU':
                estado = 'ANULADA'
                break;
            default:
                break;
        }
        return estado;
    }
    const estadoCmp = obtenerValorEstado(elemento.estadoComprobante);
    const fechaDescripcion = obtenerFecha(elemento.fechaEmision);
    
    return (
        <div
            className="container mx-auto mb-6 border-2 rounded-t-md pb-4"
        >
            <div className="flex justify-end py-2 px-3 bg-gray-200 rounded-md rounded-b-none">
                <div className="">
                    <div className="flex">
                        {/* <NavLink
                            className="flex items-center p-2 hover:bg-gray-100 focus:outline-none text-blue-400"
                            to="/emitidas"
                        >
                            <i className="fas fa-arrow-circle-left mr-2"></i>
                            <p className="hidden md:block">Descargar</p>
                        </NavLink> */}
                        <NavLink
                            className="flex items-center p-2 hover:bg-gray-100 focus:outline-none text-blue-400"
                            to="/emitidas"
                        >
                            <i className="fas fa-arrow-circle-left mr-2"></i>
                            <p className="hidden md:block">Regresar</p>
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className='pr-3'>
                <div className='flex justify-end mt-3'>
                    <p className={
                            'py-2 px-4 text-sm font-medium border-2 ' + 
                            ((estadoCmp === 'PROCESADA') ? ' border-green-400 text-green-400' : ' border-red-400 text-red-400')
                        }>{estadoCmp}</p>
                </div>
                <div className='flex justify-end mt-3'>
                    <p className='text-2xl font-light'>Factura {elemento.estab}-{elemento.ptoEmi}-{elemento.secuencial}</p>
                </div>
                <div className='flex justify-end mt-3'>
                    <p className='text-2xl font-thin'>{fechaDescripcion}</p>
                </div>
            </div>
            <div className='flex flex-col flex-wrap lg:flex-row content-center lg:justify-between mt-3 lg:px-2'>
                <div className='w-11/12 lg:w-5/12'>
                    <p className='capitalize text-lg font-light text-gray-800'>{elemento.razonSocial.toLowerCase()}</p>
                    <p className='text-sm font-light text-gray-600 mt-4'>RUC {elemento.ruc}</p>
                    <p className='text-sm font-light text-gray-600'>{elemento.dirEstablecimiento}</p>
                </div>
                <hr className='mt-4 border-gray-400 lg:hidden' />
                <div className='mt-4 lg:mt-0 w-11/12 lg:w-6/12'>
                    <p className='capitalize text-lg font-light text-gray-800'>Autorización</p>
                    {/* <p className='text-sm font-light text-gray-600 mt-4'>Número</p> */}
                    <p className='text-xs xl:text-sm font-light text-gray-600 mt-1'>{elemento.claveAcceso}</p>
                </div>
            </div>
            <hr className='mt-4 mx-2 border-gray-400' />
            <div className='flex flex-col mt-4 px-2'>
                <p className='capitalize text-lg font-light text-blue-400'>{elemento.razonSocialComprador.toLowerCase()}</p>
                <p className='text-sm font-light text-gray-600 mt-2'>Cedula {elemento.identificacionComprador}</p>
                <p className='text-sm font-light text-gray-600'>{elemento.cliente.mail}</p>
                <p className='text-sm font-light text-gray-600'>{elemento.cliente.direccion}</p>
                <p className='text-sm font-light text-gray-600'>Telf. {elemento.cliente.telefono}</p>
            </div>
            <hr className='mt-4 mx-2 border-gray-400' />
            <div className="block w-full overflow-x-auto px-2 mt-4">
                <table className="table-fixed w-full mt-4">
                    <thead>
                        <tr>
                            <th
                                className='w-2/6 border-b-2 border-gray-300 py-2 font-light text-gray-900'
                            >Descripción</th>
                            <th
                                className='w-1/6 border-b-2 border-gray-300 py-2 font-light text-gray-900'
                            >Cantidad</th>
                            <th
                                className='w-1/6 border-b-2 border-gray-300 py-2 font-light text-gray-900'
                            >Precio Unitario</th>
                            <th
                                className='w-1/6 border-b-2 border-gray-300 py-2 font-light text-gray-900'
                            >Descuento</th>
                            <th
                                className='w-1/6 border-b-2 border-gray-300 py-2 font-light text-gray-900'
                            >Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            detallesComprobante.map(detalle => {
                                return <tr key={detalle._id} className='p-3'>
                                    <td
                                        className=' font-light text-gray-600 text-sm'
                                    >{detalle.descripcion}</td>
                                    <td
                                        className='text-center font-light text-gray-600 text-sm'
                                    >{detalle.cantidad}</td>
                                    <td
                                        className='text-center font-light text-gray-600 text-sm'
                                    >{detalle.precioUnitario}</td>
                                    <td
                                        className='text-center font-light text-gray-600 text-sm'
                                    >{detalle.descuento}</td>
                                    <td
                                        className='text-center font-light text-gray-600 text-sm'
                                    >{detalle.totalSinImpuesto}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
