import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { startObtenerComprobantesEmitidos } from '../../actions/comprobante';
import { Tabla } from '../ui/Tabla';
import { Pagination } from '../ui/Pagination';
import { Cargando } from '../ui/Cargando';
import { MenuFechas } from '../ui/MenuFechas';
import { ComprobanteVacio } from '../comprobantes/ComprobanteVacio';

const headersEmitidos = [
    'Cliente',
    'Número',
    'Fecha',
    'Valor',
    'Estado',
    ''
]

export const FacturasEmitidasScreen = () => {
    const dispatch = useDispatch();
    const [emitidos, setEmitidos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { comprobantesEmitidos, descargandoPdf, fechaInicio, fechaFin } = useSelector(state => state.comprobante);
    useEffect(() => {
        dispatch(startObtenerComprobantesEmitidos(fechaInicio, fechaFin));
    }, [dispatch, fechaInicio, fechaFin])
    useEffect(() => {
        const obtenerEmitidos = () => {
            setCurrentPage(1);
            if ( comprobantesEmitidos.length > 0 ) {
                setEmitidos(comprobantesEmitidos.map(detalle => (
                    {
                        nombre: detalle.razonSocialComprador,
                        numero: `${detalle.estab}-${detalle.ptoEmi}-${detalle.secuencial}`,
                        fecha: detalle.fechaEmision,
                        valor: `$${detalle.importeTotal}`,
                        estado: obtenerValorEstado(detalle.estadoComprobante),
                        claveAcceso: detalle.claveAcceso,
                    }
                )));
            } else {
                setEmitidos([]);
            }
        }
        obtenerEmitidos();
    }, [comprobantesEmitidos])

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
                    estado = 'PAGO PENDIENTE'
                    break;
                case 'DEV':
                    estado = 'DEVUELTA'
                    break;
                default:
                    break;
        }
        return estado;
    }
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = emitidos.slice(indexOfFirstRow, indexOfLastRow);
    return (
        <div
            className="container mx-auto mb-6"
        >
            <div className="flex justify-between mb-4">
                <div>
                    <MenuFechas />
                </div>
                {/* <h2 className="text-2xl font-bold mb-6 pb-2 tracking-wider uppercase"></h2> */}
                <div>
                    <div className="relative mr-4 inline-block">
                        <NavLink
                            className="text-xs uppercase py-3 font-bold block bg-blue-400 text-white rounded-md border p-4 shadow-lg hover:bg-blue-700"
                            to="/factura"
                        >
                            Nueva Factura
                        </NavLink>
                    </div>
                </div>
            </div>

            <NavLink
                to="/factura"
            >
                <button
                    className="p-0 w-16 h-16 bg-blue-400 rounded-full hover:bg-blue-700 active:shadow-lg mouse shadow transition ease-in duration-200 fixed right-6 bottom-6 z-20 focus:outline-none"
                >
                    <i className="fas fa-plus text-white"></i>
                </button>
            </NavLink>
            {
                currentRows.length > 0 ? (
                    <div>
                <Tabla
                    data={currentRows}
                    headers={headersEmitidos}
                    acciones={true}
                />
                {
                    emitidos.length > 10 && <Pagination
                        rowsPerPage={rowsPerPage}
                        totalRows={emitidos.length}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        setRowsPerPage={setRowsPerPage}
                    />
                }
            </div>
                ): <div className="flex justify-center rounded-md border border-blue-400 p-4"><ComprobanteVacio /></div>
            }
            {/* <div>
                <Tabla
                    data={currentRows}
                    headers={headersEmitidos}
                    acciones={true}
                />
                {
                    emitidos.length > 10 && <Pagination
                        rowsPerPage={rowsPerPage}
                        totalRows={emitidos.length}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        setRowsPerPage={setRowsPerPage}
                    />
                }
            </div> */}
            {
                descargandoPdf && <Cargando />
            }
        </div>
    )
}
