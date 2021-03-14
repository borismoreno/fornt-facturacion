import { fetchConToken } from '../helpers/fetch';
import { types } from '../types/types';

export const startBuscarTipoIdentificacion = () => {
    return async(dispatch) => {
        const respuesta = await fetchConToken('configuracion/tiposIdentificacion');
        const body = await respuesta.json();
        if ( body.ok ) {
            dispatch(buscarTipoIdentificacion(body.tiposIdentificacion));
        }
    }
}

const buscarTipoIdentificacion = (tiposIdentificacion) => ({
    type: types.configuracionTiposIdentificacion,
    payload: tiposIdentificacion
});

export const startObtenerDatosEmpresa = (empresaId) => {
    return async(dispatch) => {
        const respuesta = await fetchConToken(`configuracion/empresa/${empresaId}`);
        const body = await respuesta.json();
        if ( body.ok ) {
            dispatch(obtenerDatosEmpresa(body.empresa));
        }
    }
}

const obtenerDatosEmpresa = (empresa) => ({
    type: types.configuracionDatosEmpresa,
    payload: empresa
})

export const startObtenerTiposProducto = () => {
    return async(dispatch) => {
        const respuesta = await fetchConToken('configuracion/tiposProducto');
        const body = await respuesta.json();
        if ( body.ok ) {
            dispatch(obtenerTiposProducto(body.tiposProducto));
        }
    }
}

const obtenerTiposProducto = (tiposProducto) => ({
    type: types.configuracionTiposProducto,
    payload: tiposProducto
})

export const startObtenerTarifasIva = () => {
    return async(dispatch) => {
        const respuesta = await fetchConToken('configuracion/tarifasIva');
        const body = await respuesta.json();
        if ( body.ok ) {
            dispatch(obtenerTarifasIva(body.tarifasIva));
        }
    }
}

const obtenerTarifasIva = (tarifasIva) => ({
    type: types.configuracionTarifasIva,
    payload: tarifasIva
})