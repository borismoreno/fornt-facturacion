import React from 'react';
import Sidebar from '../components/ui/Sidebar';
import { Switch, Route, Redirect } from 'react-router-dom';
import { DashboardScreen } from '../components/dashboard/DashboardScreen';
import { FacturaScreen } from '../components/comprobantes/FacturaScreen';
import { Navbar } from '../components/ui/Navbar';
// import { HeaderStats } from '../components/ui/HeaderStats';

export const RouterPrincipal = () => {
    return (
        <>
            <Sidebar />
            <div className="relative md:ml-64 bg-gray-200">
                <Navbar />
                <div className="px-4 md:px-10 mx-auto w-full">
                    <Switch>
                        <Route exact path='/dashboard' component={ DashboardScreen } />
                        <Route exact path='/factura' component={ FacturaScreen } />
                        <Redirect to='/dashboard' />
                    </Switch>
                </div>
            </div>
        </>
    );
}