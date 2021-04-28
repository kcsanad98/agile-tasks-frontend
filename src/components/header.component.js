import { Link, useHistory } from 'react-router-dom';
import authenticationService from '../services/authentication.service';
import * as ROUTES from '../constants/routes';

export default function Header() {
    const history = useHistory();

    function logout() {
        authenticationService.logout();
        history.push(ROUTES.LOGIN);
    }

    return (
        <header className="h-16 bg-white border-b border-gray-primary flex justify-between px-2 md:px-8 max-w">
            <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
                <h1 className="flex justify-center font-bold text-blue-medium">
                    <Link to={ROUTES.HOME}>Agile tasks</Link>
                </h1>
            </div>
            {authenticationService.currentUserValue() && (
                <h1 className="md:text-xl font-bold text-center flex items-center align-items">
                    {authenticationService.currentUserValue().email}
                </h1>
            )}
            <div className="text-gray-700 text-center flex items-center align-items">
                <button
                    type="button"
                    title="Sign Out"
                    onClick={() => logout()}
                    onKeyDown={event => {
                        if (event.key === 'Enter') {
                            logout();
                        }
                    }}>
                    <svg
                        className="w-8 mr-6 text-black-light cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                    </svg>
                </button>
            </div>
        </header>
    );
}
