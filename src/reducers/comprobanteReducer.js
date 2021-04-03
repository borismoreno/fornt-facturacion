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
    fechaInicio: inicio
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
        default:
            return state;
    }
}