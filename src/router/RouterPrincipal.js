import React from 'react';
import Sidebar from '../components/ui/Sidebar';
import { Switch, Route, Redirect } from 'react-router-dom';
import { DashboardScreen } from '../components/dashboard/DashboardScreen';
import { FacturaScreen } from '../components/comprobantes/FacturaScreen';
import RetencionScreen from '../components/comprobantes/retenciones/RetencionScreen';
import { Navbar } from '../components/ui/Navbar';
import { FacturasEmitidasScreen } from '../components/emitidas/FacturasEmitidasScreen';
import { FacturaDetalleScreen } from '../components/comprobantes/FacturaDetalleScreen';
import { RetencionesEmitidasScreen } from '../components/comprobantes/retenciones/RetencionesEmitidasScreen';
import NotaCreditoEmitidasScreen from '../components/comprobantes/notaCredito/NotaCreditoEmitidasScreen';
import NotaCreditoScreen from '../components/comprobantes/notaCredito/NotaCreditoScreen';
import NotaCreditoDetalleScreen from '../components/comprobantes/notaCredito/NotaCreditoDetalleScreen';
// import { SidebarV2 } from '../components/ui/SidebarV2';

export const RouterPrincipal = () => {
    return (
        <>
            <Sidebar />
            <div className="relative md:ml-64 bg-white">
                <Navbar />
                <div className="px-4 md:px-10 mx-auto w-full mt-4 pb-2">
                    <Switch>
                        <Route exact path='/dashboard' component={ DashboardScreen } />
                        <Route exact path='/emitidas/factura' component={ FacturaScreen } />
                        <Route exact path='/emitidas' component={ FacturasEmitidasScreen } />
                        <Route exact path='/retenciones' component={ RetencionesEmitidasScreen } />
                        <Route exact path='/retenciones/nuevo' component={ RetencionScreen } />
                        <Route exact path='/notasCredito' component={ NotaCreditoEmitidasScreen } />
                        <Route exact path='/notasCredito/nuevo/:id' component={ NotaCreditoScreen } />
                        <Route path='/emitidas/factura/:id' component={ FacturaDetalleScreen }/>
                        <Route exact path='/notasCredito/notaCredito/:id' component={ NotaCreditoDetalleScreen }/>
                        <Redirect to='/dashboard' />
                    </Switch>
                </div>
            </div>
        </>
    );
}