import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startOcultarError } from '../../actions/alerta';

export const MostrarAlerta = () => {
    const dispatch = useDispatch();
    const { mostrarError, mensajeError } = useSelector(state => state.alerta);
    const handleCerrar = () => {
        dispatch(startOcultarError());
    }
    return (
        <div>
            {
                mostrarError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded fixed z-10 top-5 right-5 w-96" role="alert">
                        {/* <strong className="font-bold">Error!</strong><br/> */}
                        <span className="block sm:inline">{ mensajeError }</span>
                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                            <i 
                                className="fas fa-window-close cursor-pointer" 
                                onClick={ handleCerrar }></i>
                        </span>
                    </div>)
            }
        </div>
    )
}
