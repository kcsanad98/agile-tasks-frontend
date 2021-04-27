const server = {
    protocol: 'http',
    host: 'localhost',
    port: 8080
};

const api = {
    login: '/auth/signin',
    signUp: '/auth/signup',
    boards: '/board',
    users: '/user',
    addUserToBoard: '/board/users/add',
    removeUserFromBoard: '/board/users/remove'
};

const config = {
    server,
    api
};

export default config;
