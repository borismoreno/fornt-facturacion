import { types } from '../types/types';

const initialState = {
    tiposIdentificacion: null,
    tiposProducto: null,
    tarifasIva: null,
    empresa: null,
    formasPago: null,
}

export const configuracionReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.configuracionTiposIdentificacion:
            return {
                ...state,
                tiposIdentificacion: action.payload,
            }
        case types.configuracionDatosEmpresa:
            return {
                ...state,
                empresa: action.payload,
            }
        case types.configuracionTiposProducto:
            return {
                ...state,
                tiposProducto: action.payload,
            }
        case types.configuracionTarifasIva:
            return {
                ...state,
                tarifasIva: action.payload,
            }
        case types.configuracionFormasPago:
            return {
                ...state,
                formasPago: action.payload
            }
        default:
            return state;
    }
}