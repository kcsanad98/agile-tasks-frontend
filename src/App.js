import React, { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import authenticationService from './services/authentication.service';
import Header from './components/header.component';
import ProtectedRoute from './components/protected-route.component';
import { SocketContext, socket } from './context/socket.context';

const Login = lazy(() => import('./pages/login.page'));
const SignUp = lazy(() => import('./pages/sign-up.page'));
const Home = lazy(() => import('./pages/home.page'));
const CreateBoard = lazy(() => import('./pages/create-board.page'));
const Board = lazy(() => import('./pages/board.page'));
const Task = lazy(() => import('./pages/task.page'));
const NotFound = lazy(() => import('./pages/not-found.page'));

function App() {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        authenticationService.currentUser().subscribe(user => setCurrentUser(user));
        return () => socket.close();
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            <Router>
                {currentUser && <Header />}
                <Suspense fallback={<p>Loading...</p>}>
                    <Switch>
                        <Route path={ROUTES.LOGIN} component={Login} exact />
                        <Route path={ROUTES.SIGN_UP} component={SignUp} exact />
                        <ProtectedRoute path={ROUTES.HOME} component={Home} exact />
                        <ProtectedRoute path={ROUTES.CREATE_BOARD} component={CreateBoard} exact />
                        <ProtectedRoute path={ROUTES.TASK} component={Task} />
                        <ProtectedRoute path={ROUTES.BOARD} component={Board} />
                        <Route component={NotFound} />
                    </Switch>
                </Suspense>
            </Router>
        </SocketContext.Provider>
    );
}

export default App;
