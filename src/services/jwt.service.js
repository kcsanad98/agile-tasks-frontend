import jwtDecode from 'jwt-decode';

function decode(token) {
    const decoded = jwtDecode(token);
    return decoded;
}

const jwtService = {
    decode
};

export default jwtService;
