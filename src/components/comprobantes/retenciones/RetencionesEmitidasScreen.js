import React from 'react';
import { NavLink } from 'react-router-dom';
import { ExportarExcel } from '../../ui/ExportarExcel';
import { MenuFechas } from '../../ui/MenuFechas';
import { ComprobanteVacio } from '../ComprobanteVacio';

export const RetencionesEmitidasScreen = () => {
    // const [datosExcel, setDatosExcel] = useState([]);
    return (
        <div className="container mx-auto mb-6">
            <div className="flex justify-between mb-4">
                <div className="flex">
                    <MenuFechas />
                    <ExportarExcel multiDataSet={[]} valorBoton="Exportar a excel" nombreArchivo="Retenciones Emitidas" nombreHoja="Retenciones"/>
                </div>
                <div>
                    <div className="relative mr-4 inline-block">
                        <NavLink
                            className="text-xs uppercase py-3 font-bold block bg-blue-400 text-white rounded-md border p-4 shadow-lg hover:bg-blue-700"
                            to="/retenciones/nuevo"
                        >
                            Nueva Retención
                        </NavLink>
                    </div>
                </div>
            </div>

            <NavLink
                to="/retenciones/nuevo"
            >
                <button
                    className="p-0 w-16 h-16 bg-blue-400 rounded-full hover:bg-blue-700 active:shadow-lg mouse shadow transition ease-in duration-200 fixed right-6 bottom-6 z-20 focus:outline-none"
                >
                    <i className="fas fa-plus text-white"></i>
                </button>
            </NavLink>
            {/* {
                currentRows.length > 0 ? 
                    <div>
                        <TablaFacturas 
                            data={currentRows}
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
                :  */}
                <div className="flex justify-center rounded-md border border-blue-400 p-4">
                    <ComprobanteVacio />
                </div>
            {/* } */}
        </div>
    )
}
