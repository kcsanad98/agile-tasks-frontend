import { BehaviorSubject } from 'rxjs';
import config from '../constants/config';
import jwtService from './jwt.service';
import localStorageService from './local-storage.service';
import backendService from './backend.service';

const apiConfig = config.api;

const currentUserSubject = new BehaviorSubject(localStorageService.getStoredUser());

async function login(email, password) {
    const requestBody = { email, password };
    const response = await backendService.post(apiConfig.login, requestBody);
    const token = response.accessToken;
    const user = jwtService.decode(token);
    if (user) {
        localStorageService.saveUser(token, user.email, user.id);
        currentUserSubject.next(user);
    }
}

async function signUp(email, password) {
    const requestBody = { email, password };
    await backendService.post(apiConfig.signUp, requestBody);
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
    signUp,
    logout,
    currentUser,
    currentUserValue
};

export default authenticationService;
