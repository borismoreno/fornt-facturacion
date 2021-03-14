import { types } from '../types/types';

const initialState = {
    detallesFactura: [],
}

export const facturaReducer = (state = initialState, action) =>{
    switch (action.type) {
        case types.facturaAgregarDetalle:
            return {
                ...state,
                detallesFactura: [...state.detallesFactura, action.payload],
            }
        case types.facturaLimpiarFactura:
            return {
                ...state,
                detallesFactura: [],
            }
        default:
            return state;
    }
}