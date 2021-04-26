import { useEffect } from 'react';
import authenticationService from './services/authentication.service';

function App() {
    useEffect(() => {
        authenticationService.login('jozsikas@gmail.com', 'nGh67_123');
    }, []);

    return <div className="App">This is the app</div>;
}

export default App;
