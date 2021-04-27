import React, { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import authenticationService from './services/authentication.service';
import Header from './components/header.component';
import PrivateRoute from './components/private-route.component';

const Login = lazy(() => import('./pages/login.page'));
const SignUp = lazy(() => import('./pages/sign-up.page'));
const Home = lazy(() => import('./pages/home.page'));
const CreateBoard = lazy(() => import('./pages/create-board.page'));
const Board = lazy(() => import('./pages/board.page'));
const NotFound = lazy(() => import('./pages/not-found.page'));

function App() {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        authenticationService.currentUser().subscribe(user => setCurrentUser(user));
    }, []);

    return (
        <Router>
            {currentUser && <Header />}
            <Suspense fallback={<p>Loading...</p>}>
                <Switch>
                    <Route path={ROUTES.LOGIN} component={Login} exact />
                    <Route path={ROUTES.SIGN_UP} component={SignUp} exact />
                    <PrivateRoute path={ROUTES.HOME} component={Home} exact />
                    <PrivateRoute path={ROUTES.CREATE_BOARD} component={CreateBoard} exact />
                    <PrivateRoute path={ROUTES.BOARD} component={Board} />
                    <Route component={NotFound} />
                </Switch>
            </Suspense>
        </Router>
    );
}

export default App;
