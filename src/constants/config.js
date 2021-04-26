const server = {
    protocol: 'http',
    host: 'localhost',
    port: 8080
};

const api = {
    login: '/auth/signin',
    signUp: '/auth/signup'
};

const config = {
    server,
    api
};

export default config;
