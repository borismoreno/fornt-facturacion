import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { dashboardReducer } from './dashboardReducer';

export const rootReducer = combineReducers({
    auth: authReducer,
    dashboard: dashboardReducer,
})