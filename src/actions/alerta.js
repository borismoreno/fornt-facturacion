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

export const startMostrarCargando = () => {
    return (dispatch) => {
        dispatch(mostrarCargando());
    }
}

export const startOcultarCargando = () => {
    return (dispatch) => {
        dispatch(ocultarCargando());
    }
}

const mostrarError = mensaje => ({ 
    type: types.alertaMostrar ,
    payload: mensaje
});

const ocultarError = () => ({ type: types.alertaOcultar })

const mostrarCargando = () => ({ type: types.cargandoMostrar })

const ocultarCargando = () => ({ type: types.cargandoOcultar })