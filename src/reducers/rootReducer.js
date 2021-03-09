import { combineReducers } from 'redux';
import { alertaReducer } from './alertaReducer';
import { authReducer } from './authReducer';
import { dashboardReducer } from './dashboardReducer';

export const rootReducer = combineReducers({
    auth: authReducer,
    dashboard: dashboardReducer,
    alerta: alertaReducer,
})