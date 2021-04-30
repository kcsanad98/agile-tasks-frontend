const server = {
    protocol: 'http',
    host: 'localhost',
    port: 8080,
    socketGateway: 'task-update'
};

const api = {
    login: '/auth/signin',
    signUp: '/auth/signup',
    boards: '/board',
    users: '/user',
    tasks: '/task',
    addUserToBoard: '/board/users/add',
    removeUserFromBoard: '/board/users/remove',
    getTasksByBoard: '/task/board'
};

const config = {
    server,
    api
};

export default config;
