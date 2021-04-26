import { BehaviorSubject } from 'rxjs';
import config from '../constants/config';
import backendService from './backend.service';
import jwtService from './jwt.service';
import localStorageService from './local-storage.service';

const currentUserSubject = new BehaviorSubject(localStorageService.getCurrentUser());
const apiConfig = config.api;

async function login(email, password) {
    const requestBody = { email, password };
    const response = await backendService.post(apiConfig.login, requestBody);
    const token = response.accessToken;
    if (jwtService.isValid(token)) {
        const user = jwtService.decode(token);
        if (user) {
            localStorageService.saveUser(token, user.email, user.id);
            currentUserSubject.next(user);
        }
    }
}

async function logout() {
    localStorageService.deleteUser();
    currentUserSubject.next(null);
}

function currentUser() {
    return currentUserSubject.asObservable();
}

function currentUserValue() {
    return currentUserSubject.value;
}

const authenticationService = {
    login,
    logout,
    currentUser,
    currentUserValue
};

export default authenticationService;
