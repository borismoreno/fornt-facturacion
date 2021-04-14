import { fetchConToken } from '../helpers/fetch';
import { saveAs } from 'file-saver';
import { types } from '../types/types';
import { startObtenerClaveAcceso } from './factura';

export const startObtenerComprobantesEmitidos = (fechaInicio, fechaFin) => {
    return async(dispatch) => {
        const respuesta = await fetchConToken('comprobante/comprobantes-emitidos',{fechaInicio,fechaFin}, 'POST');
        const body = await respuesta.json();
        if ( body.ok ) {
            dispatch(obtenerComprobantesEmitidos(body.comprobantes));
        }
    }
}

export const startObtenerPdf = (claveAcceso) => {
    return async(dispatch) => {
        try {
            dispatch(iniciarObtenerPdf());
            const respuesta = await fetchConToken(`comprobante/obtener-pdf/${claveAcceso}`);
            const body = await respuesta.blob();
            saveAs(body, claveAcceso);
            dispatch(terminarObtenerPdf());
        } catch (error) {
            console.log(error);        
            dispatch(terminarObtenerPdf());
        }
    }
}

export const startObtenerFechas = (fechaInicio, fechaFin) => {
    return async(dispatch) => {
        dispatch(obtenerFechas({fechaInicio, fechaFin}));
    }
}

export const startObtenerError = (facturaId) => {
    return async(dispatch) => {
        const respuesta = await fetchConToken(`errores/error-devuelta/${facturaId}`);
        const body = await respuesta.json();
        if ( body.ok ) {
            dispatch(obtenerError(body.errorDevuelta));
        }
    }
}

export const startLimpiarError = () => {
    return async(dispatch) => {
        dispatch(limpiarError());
    }
}

export const startReenviarMail = (claveAcceso) => {
    return async(dispatch) => {
        dispatch(reenviarMail(claveAcceso));
    }
}

export const terminarReenviarMail = () => {
    return async(dispatch) => {
        dispatch(limpiarReenvioMail());
    }
}

export const startReenvio = (datos) => {
    return async(dispatch) => {
        try {
            const respuesta = await fetchConToken('comprobante/reenvio-mail', datos, 'POST');
            const body = await respuesta.json();
            if (body.ok) {
                dispatch(limpiarReenvioMail());
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const startPresentarReprocesar = (claveAcceso) => {
    return (dispatch) => {
        dispatch(presentarReprocesar(claveAcceso));
    }
}

export const startOcultarReprocesar = () => {
    return (dispatch) => {
        dispatch(ocultarReprocesar());
    }
}

export const startReprocesarComprobante = (claveAcceso) => {
    return async(dispatch) => {
        try {
            const respuesta = await fetchConToken('comprobante/reenvio', {claveAcceso}, 'POST');
            const body = await respuesta.json();
            if (body.ok) {
                dispatch(startObtenerClaveAcceso(body.claveAcceso));
                dispatch(ocultarReprocesar());
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const obtenerComprobantesEmitidos = (comprobantes) => ({
    type: types.comprobanteObtenerEmitidos,
    payload: comprobantes
});

const iniciarObtenerPdf = () => ({type: types.comprobanteIniciarObtenerPdf});

const terminarObtenerPdf = () => ({type: types.comprobanteTerminarObtenerPdf});

const limpiarError = () => ({type: types.comprobanteLimpiarError});

const obtenerFechas = (fechas) => ({
    type: types.comprobanteObtenerFechasBusqueda,
    payload: fechas
});

const obtenerError = (error) => ({
    type: types.comprobanteObtenerError,
    payload: error
});

const reenviarMail = (claveAcceso) => ({
    type: types.comprobanteIniciarReenvioMail,
    payload: claveAcceso
});

const limpiarReenvioMail = () => ({type: types.comprobanteTerminarReenvioMail});

const presentarReprocesar = (claveAcceso) => ({
    type: types.comprobantePresentarReprocesar,
    payload: claveAcceso
});

const ocultarReprocesar = () => ({type: types.comprobanteOcultarReprocesar});