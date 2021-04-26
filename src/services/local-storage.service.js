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
    let result = null;
    const currentUser = localStorage.getItem(STORAGE_KEY);
    if (currentUser) {
        result = JSON.parse(currentUser);
    }
    return result;
}

const localStorageService = {
    saveUser,
    deleteUser,
    getStoredUser
};

export default localStorageService;
