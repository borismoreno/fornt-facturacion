import { fetchConToken } from '../helpers/fetch';
import { saveAs } from 'file-saver';
import { types } from '../types/types';
import { startObtenerClaveAcceso } from './factura';
import { startOcultarCargando } from './ui';
import { startMostrarError } from './alerta';

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
                dispatch(startMostrarError('Mail enviado correctamente.', 'correcto'));
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

export const startPresentarAnular = (claveAcceso) => {
    return (dispatch) => {
        dispatch(presentarAnular(claveAcceso));
    }
}

export const startOcultarAnular = () => {
    return (dispatch) => {
        dispatch(ocultarAnular());
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

export const startObtenerAutorizacion = (claveAcceso) => {
    return async(dispatch) => {
        try {
            await fetchConToken('comprobante/obtener-autorizacion', {claveAcceso}, 'POST');
            dispatch(startOcultarCargando());
        } catch (error) {
            console.log(error);
        }
    }
}

export const startEnviarMail = (claveAcceso) => {
    return async(dispatch) => {
        try {
            const respuesta = await fetchConToken('comprobante/enviar-mail', {claveAcceso}, 'POST');
            const body = await respuesta.json();
            if ( body.ok ) {
                const { comprobante } = body;
                comprobante.estadoComprobante = 'EMA';
                dispatch(startMostrarError('Mail enviado correctamente.', 'correcto'));
                dispatch(actualizarComprobantes(comprobante));
            } else {
                if ( body.msg ) {
                    dispatch(startMostrarError(body.msg));
                }
            }
        } catch (error) {
            console.log(error);
        }
        dispatch(startOcultarCargando());
    }
}

export const startAnularComprobante = (claveAcceso) => {
    return async(dispatch) => {
        try {
            const respuesta = await fetchConToken('comprobante/anular-comprobante', {claveAcceso}, 'POST');
            const body = await respuesta.json();
            if ( body.ok ) {
                const { comprobante } = body;
                comprobante.estadoComprobante = 'ANU';
                dispatch(startMostrarError('Comprobante anulado correctamente.', 'correcto'));
                dispatch(ocultarAnular());
                dispatch(actualizarComprobantes(comprobante));
            } else {
                if ( body.msg ) {
                    dispatch(startMostrarError(body.msg));
                }
            }
        } catch (error) {
            console.log(error);
        }
        dispatch(startOcultarCargando());
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

const actualizarComprobantes = (comprobante) => ({
    type: types.comprobanteActualizarComprobantes,
    payload: comprobante
})

const limpiarReenvioMail = () => ({type: types.comprobanteTerminarReenvioMail});

const presentarReprocesar = (claveAcceso) => ({
    type: types.comprobantePresentarReprocesar,
    payload: claveAcceso
});

const ocultarReprocesar = () => ({type: types.comprobanteOcultarReprocesar});

const presentarAnular = (claveAcceso) => ({
    type: types.comprobantePresentarAnular,
    payload: claveAcceso
});

const ocultarAnular = () => ({type: types.comprobanteOcultarAnular});