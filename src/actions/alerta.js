import { types } from '../types/types';

export const startMostrarError = (mensajeError) => {
    return (dispatch) => {
        dispatch(mostrarError(mensajeError));
        setTimeout(() => {
            dispatch(ocultarError());
        }, 3000);
    }
}

export const startOcultarError = () => {
    return (dispatch) => {
        dispatch(ocultarError());
    }
}

const mostrarError = mensaje => ({ 
    type: types.alertaMostrar ,
    payload: mensaje
});

const ocultarError = () => ({ type: types.alertaOcultar })