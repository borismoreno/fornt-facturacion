import React from 'react';
import { useDispatch } from 'react-redux';
import { startLogout } from '../../actions/auth';

export const CerrarSesion = () => {
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(startLogout());
    }
    return (
        <button
            onClick={handleLogout}
        >
            Cerrar Sesión
        </button>
    )
}
