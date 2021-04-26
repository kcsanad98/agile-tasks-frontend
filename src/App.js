import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import authenticationService from './services/authentication.service';

const Login = lazy(() => import('./pages/login.page'));
const SignUp = lazy(() => import('./pages/sign-up.page'));
const Home = lazy(() => import('./pages/home.page'));
const NotFound = lazy(() => import('./pages/not-found.page'));

function App() {
    useEffect(() => {
        authenticationService.login('jozsikas@gmail.com', 'nGh67_123');
    }, []);

    return (
        <Router>
            <Suspense fallback={<p>Loading...</p>}>
                <Switch>
                    <Route path={ROUTES.LOGIN} component={Login} exact />
                    <Route path={ROUTES.SIGN_UP} component={SignUp} exact />
                    <Route path={ROUTES.HOME} component={Home} exact />
                    <Route component={NotFound} />
                </Switch>
            </Suspense>
        </Router>
    );
}

export default App;
