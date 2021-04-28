import { types } from '../types/types';

export const startMostrarError = (mensajeError, tipoMensaje = 'error') => {
    return (dispatch) => {
        dispatch(mostrarError(mensajeError, tipoMensaje));
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

const mostrarError = (mensaje, tipoMensaje) => ({ 
    type: types.alertaMostrar ,
    payload: {mensaje, tipoMensaje}
});

const ocultarError = () => ({ type: types.alertaOcultar })

const mostrarCargando = () => ({ type: types.cargandoMostrar })

const ocultarCargando = () => ({ type: types.cargandoOcultar })