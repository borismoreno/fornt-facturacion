import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
} from 'react-router-dom';
import { LoginScreen } from '../components/auth/LoginScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { startChecking } from '../actions/auth';
import { RouterPrincipal } from './RouterPrincipal';

const AppRouter = () => {
    const dispatch = useDispatch();
    const { checking, uid } = useSelector(state => state.auth);
    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch]);

    if ( checking ) {
        return <h5>Espere...</h5>
    }
    return ( 
        <Router>
            <div>
                <Switch>
                    <PublicRoute 
                        exact 
                        path='/login' 
                        component={ LoginScreen }
                        isAuthenticated={ !!uid }
                    />
                    <PrivateRoute 
                        path='/' 
                        component={ RouterPrincipal } 
                        isAuthenticated={ !!uid }
                    />
                </Switch>
            </div>
        </Router>
     );
}
 
export default AppRouter;