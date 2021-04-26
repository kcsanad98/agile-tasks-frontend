import * as MESSAGES from '../constants/messages';

const STORAGE_KEY = 'CURRENT_USER';

function saveUser(token, email, id) {
    const userObejct = {
        token,
        email,
        id
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userObejct));
}

function deleteUser() {
    localStorage.removeItem(STORAGE_KEY);
}

function getStoredUser() {
    const currentUser = localStorage.getItem(STORAGE_KEY);
    if (!currentUser) {
        throw new Error(MESSAGES.ERROR_NO_USER);
    }
    return JSON.parse(currentUser);
}

const localStorageService = {
    saveUser,
    deleteUser,
    getStoredUser
};

export default localStorageService;
