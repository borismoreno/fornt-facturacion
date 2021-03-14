import { types } from '../types/types';

export const startAgregarDetalle = (detalle) => {
    return (dispatch) => {
        dispatch(agregarDetalle(detalle));
    }
}

const agregarDetalle = (detalle) => ({
    type: types.facturaAgregarDetalle,
    payload: detalle
})

export const startLimpiarDatosFactura = () => {
    return (dispatch) => {
        dispatch(limpiarDatosFactura());
    }
}

const limpiarDatosFactura = () => ({ type: types.facturaLimpiarFactura })