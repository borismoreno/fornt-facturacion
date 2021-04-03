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
    return (
        <td 
            className="inline-block text-left p-2"
            onClick={() => setOpen(!open)}
            // onBlur={() => setOpen(false)}
        >
            <div>
                <button type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 focus:outline-none" id="options-menu" aria-expanded="true" aria-haspopup="true">
                Acciones
                
                {/* <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg> */}
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
                    {/* <a href="#" disabled={true} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Descargar PDF</a>
                    <a href="#" disabled={true} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Reenvío Mail</a>
                    <a href="#" disabled={true} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Marcar como anulada</a> */}
                </div>
            </div>}
        </td>
    )
}
