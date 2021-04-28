import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import authenticationService from '../services/authentication.service';

export default function ProtectedRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props => {
                const currentUser = authenticationService.currentUserValue();
                if (!currentUser) {
                    return (
                        <Redirect
                            to={{ pathname: ROUTES.LOGIN, state: { from: props.location } }}
                        />
                    );
                }
                return <Component {...props} />;
            }}
        />
    );
}
