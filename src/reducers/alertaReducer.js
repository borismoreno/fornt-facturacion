import { types } from '../types/types';

const initialState = {
    mostrarError: false,
    mensajeError: ''
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
        default:
            return state;
    }
}