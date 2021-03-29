import { types } from '../types/types';

const initialState = {
    mostrarError: false,
    mensajeError: '',
    mostrarCargando: false,
}

export const alertaReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.alertaMostrar:
            return {
                ...state,
                mostrarError: true,
                mensajeError: action.payload
            };
        case types.alertaOcultar:
            return {
                ...state,
                mostrarError: false,
                mensajeError: ''
            }
        case types.cargandoMostrar:
            return {
                ...state,
                mostrarCargando: true,
            }
        case types.cargandoOcultar:
            return {
                ...state,
                mostrarCargando: false
            }
        default:
            return state;
    }
}