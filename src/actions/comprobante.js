import { fetchConToken } from '../helpers/fetch';
import { saveAs } from 'file-saver';
import { types } from '../types/types';

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

const obtenerComprobantesEmitidos = (comprobantes) => ({
    type: types.comprobanteObtenerEmitidos,
    payload: comprobantes
})

const iniciarObtenerPdf = () => ({type: types.comprobanteIniciarObtenerPdf})

const terminarObtenerPdf = () => ({type: types.comprobanteTerminarObtenerPdf})

const obtenerFechas = (fechas) => ({
    type: types.comprobanteObtenerFechasBusqueda,
    payload: fechas
})