import { fetchConToken, fetchSinToken } from '../helpers/fetch';
import { types } from '../types/types';

export const startLogin = (email, password) => {
    return async(dispatch) => {
        const respuesta = await fetchSinToken('auth/login', { email, password }, 'POST');
        const body = await respuesta.json();
        if ( body.ok ) {
            localStorage.setItem('token', body.token);
            const { nombre, uid, nombreComercial, empresaId } = body;
            dispatch(login({
                nombre,
                uid,
                nombreComercial,
                empresaId
            }));
        } else {
            if ( body.msg ) {
                console.log(body.msg);
            } else {
                console.log(body.errores[0].msg);
            }
            return;
        }
    }
}

export const startChecking = () => {
    return async(dispatch) => {
        const respuesta = await fetchConToken('auth/renew');
        console.log('respuesta', respuesta);
        const body = await respuesta.json();
        if ( body.ok ) {
            localStorage.setItem('token', body.token);
            const { nombre, uid, nombreComercial, empresaId } = body;
            dispatch(login({
                nombre,
                uid,
                nombreComercial,
                empresaId
            }));
        } else {
            dispatch(checkingFinish());
        }
    }
}

const login = user => ({
    type: types.authLogin,
    payload: user,
});

const checkingFinish = () => ({ type: types.authCheckingFinish })

export const startLogout = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch(logout());
        dispatch(limpiar());
    }
}

const logout =() => ({ type: types.authLogout })

const limpiar =() => ({ type: types.dashLimpiar })
