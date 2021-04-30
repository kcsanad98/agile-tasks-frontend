const server = {
    protocol: 'http',
    host: 'localhost',
    port: 8080
};

const socket = {
    update: 'task-update',
    delete: 'task-delete',
    add: 'task-add'
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

const reducerActions = {
    add: 'add',
    addMany: 'addMany',
    remove: 'remove',
    update: 'update'
};

const config = {
    server,
    socket,
    api,
    reducerActions
};

export default config;
