import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { startObtenerPdf } from '../../actions/comprobante';

export const MenuAcciones = ({claveAcceso}) => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const handleDescargarPdf = () => {
        if (claveAcceso) {
            dispatch(startObtenerPdf(claveAcceso));
        }
    }
    const handleOnblur = () => {
        setTimeout(() => {
            setOpen(false);
        }, 200);
    }
    return (
        <td 
            className="inline-block text-left p-2"
            onClick={() => setOpen(!open)}
            onBlur={handleOnblur}
        >
            <div>
                <button type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 focus:outline-none" id="options-menu" aria-expanded="true" aria-haspopup="true">
                Acciones
                <i className="ml-2 fas fa-sort-down"></i>
                </button>
            </div>

            
            {open &&  
            <div 
                className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10" 
                role="menu" 
                aria-orientation="vertical" 
                aria-labelledby="options-menu"
            >
                <div 
                    className="py-1 focus:outline-none" 
                    role="none"
                >
                    <button 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer disabled:opacity-20"
                        disabled={true}
                    ><i className="fas fa-check-double"></i><span className="ml-4">Reprocesar</span></button>
                    <button 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 disabled:opacity-20"
                        onClick={handleDescargarPdf}
                    ><i className="far fa-file-pdf"></i><span className="ml-4">Descargar PDF</span></button>
                    <button 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer disabled:opacity-20"
                        disabled={false}
                    ><i className="far fa-envelope"></i><span className="ml-4">Reenvío Mail</span></button>
                    <button 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer disabled:opacity-20"
                        disabled={false}
                    ><i className="fas fa-exclamation-circle"></i><span className="ml-4">Marcar como anulada</span></button>
                </div>
            </div>}
        </td>
    )
}
