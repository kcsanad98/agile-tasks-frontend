import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import authenticationService from '../services/authentication.service';
import * as ROUTES from '../constants/routes';
import MESSAGES from '../constants/messages';

export default function Login() {
    const history = useHistory();

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const isInvalid = password === '' || emailAddress === '';

    const handleLogin = async event => {
        event.preventDefault();
        try {
            await authenticationService.login(emailAddress, password);
            history.push(ROUTES.HOME);
        } catch (e) {
            setEmailAddress('');
            setPassword('');
            setError(MESSAGES.ERROR.FAILED_TO_LOGIN);
        }
    };

    useEffect(() => {
        document.title = 'Login';
        if (authenticationService.currentUserValue()) {
            history.push(ROUTES.HOME);
        }
    }, []);

    return (
        <div className="container flex items-center justify-center h-screen">
            <div className="flex flex-col">
                <div className="flex flex-col items-center bg-white p-4 rounded border border-gray-primary mb-4">
                    {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}
                    <form onSubmit={handleLogin} method="POST">
                        <input
                            aria-label="Enter your email address"
                            type="text"
                            placeholder="Email address"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={({ target }) => setEmailAddress(target.value)}
                            value={emailAddress}
                        />
                        <input
                            aria-label="Enter your password"
                            type="password"
                            placeholder="Password"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={({ target }) => setPassword(target.value)}
                            value={password}
                        />
                        <button
                            disabled={isInvalid}
                            type="submit"
                            className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${
                                isInvalid && 'opacity-50'
                            }`}>
                            Log In
                        </button>
                    </form>
                </div>
                <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
                    <p className="text-sm">
                        Don't have an account?{` `}
                        <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-medium">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
