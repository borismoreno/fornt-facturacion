import { types } from '../types/types';

const fin = new Date();
fin.setHours(0,0,0,0);
const inicio = new Date();
inicio.setDate(1);
inicio.setHours(0,0,0,0);


const initialState = {
    comprobantesEmitidos: [],
    descargandoPdf: false,
    fechaFin: fin,
    fechaInicio: inicio,
    errorDevuelta: null,
    claveReenvio: null,
    claveReprocesar: null,
}

export const comprobanteReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.comprobanteObtenerEmitidos:
            return {
                ...state,
                comprobantesEmitidos: action.payload
            }
        case types.comprobanteIniciarObtenerPdf:
            return {
                ...state,
                descargandoPdf: true,
            }
        case types.comprobanteTerminarObtenerPdf:
            return {
                ...state,
                descargandoPdf: false,
            }
        case types.comprobanteObtenerFechasBusqueda:
            return {
                ...state,
                fechaInicio: action.payload.fechaInicio,
                fechaFin: action.payload.fechaFin,
            }
        case types.comprobanteObtenerError:
            return {
                ...state,
                errorDevuelta: action.payload,
            }
        case types.comprobanteLimpiarError:
            return {
                ...state,
                errorDevuelta: null,
            }
        case types.comprobanteIniciarReenvioMail:
            return {
                ...state,
                claveReenvio: action.payload,
            }
        case types.comprobanteTerminarReenvioMail:
            return {
                ...state,
                claveReenvio: null,
            }
        case types.comprobantePresentarReprocesar:
            return {
                ...state,
                claveReprocesar: action.payload,
            }
        case types.comprobanteOcultarReprocesar:
            return {
                ...state,
                claveReprocesar: null,
            }
        default:
            return state;
    }
}