import { fetchConToken } from '../helpers/fetch';
import { types } from '../types/types';
import { saveAs } from 'file-saver';
import { startOcultarCargando } from './alerta';
import { startLimpiarSeleccion } from './clientes';
import { startObtenerDatosEmpresa } from './configuracion';

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

export const startAgregarAdicional = (adicional) => {
    return (dispatch) => {
        dispatch(agregarAdicional(adicional));
    }
}

const agregarAdicional = (adicional) => ({
    type: types.facturaAgregarAdicional,
    payload: adicional
})

export const startAgregarFormaPago = (formaPago) => {
    return (dispatch) => {
        dispatch(agregarFormaPago(formaPago));
    }
}

const agregarFormaPago = (formaPago) => ({
    type: types.facturaAgregarFormaPago,
    payload: formaPago
})

export const startAgregarValoresFactura = (valoresFactura) => {
    return (dispatch) => {
        dispatch(agregarValoresFactura(valoresFactura));
    }
}

const agregarValoresFactura = (valoresFactura) => ({
    type: types.facturaValoresFactura,
    payload: valoresFactura
})

export const startActualizarDetallesFactura = (detallesFactura) => {
    return (dispatch) => {
        dispatch(actualizarDetallesFactura(detallesFactura));
    }
}

const actualizarDetallesFactura = (detallesFactura) => ({
    type: types.facturaActualizarDetalles,
    payload: detallesFactura
})

export const startActualizarAdicionales = (datosAdicionales) => {
    return (dispatch) => {
        dispatch(actualizarAdicionales(datosAdicionales));
    }
}

const actualizarAdicionales = (datosAdicionales) => ({
    type: types.facturaActualizarAdicionales,
    payload: datosAdicionales
})

export const startActualizarFormasPago = (formasPago) => {
    return (dispatch) => {
        dispatch(actualizarFormasPago(formasPago));
    }
}

const actualizarFormasPago = (formasPago) => ({
    type: types.facturaActualizarFormasPago,
    payload: formasPago
})

export const startEmitirFactura = (envioFactura) => {
    return async (dispatch) => {
        try {
            const { empresa } = envioFactura;
            const pad = '000000000';
            const nombreArchivo = `${empresa.establecimiento}-${empresa.puntoEmision}-${pad.substring(0, pad.length - empresa.secuencialFactura.length) + empresa.secuencialFactura}`;
            const respuesta = await fetchConToken('comprobante', envioFactura, 'POST');
            const body = await respuesta.blob();
            saveAs(body, nombreArchivo);
            dispatch(startOcultarCargando());
            dispatch(limpiarDatosFactura());
            dispatch(startLimpiarSeleccion());
            dispatch(startObtenerDatosEmpresa(empresa._id));
        } catch (error) {
            console.log(error);
        }
    }
}