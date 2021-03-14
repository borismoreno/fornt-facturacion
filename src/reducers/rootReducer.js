import { combineReducers } from 'redux';
import { alertaReducer } from './alertaReducer';
import { authReducer } from './authReducer';
import { clientesReducer } from './clientesReducer';
import { configuracionReducer } from './configuracionReducer';
import { dashboardReducer } from './dashboardReducer';
import { facturaReducer } from './facturaReducer';

export const rootReducer = combineReducers({
    auth: authReducer,
    dashboard: dashboardReducer,
    alerta: alertaReducer,
    clientes: clientesReducer,
    configuracion: configuracionReducer,
    factura: facturaReducer,
})