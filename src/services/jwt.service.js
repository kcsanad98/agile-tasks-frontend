import jwtDecode from 'jwt-decode';

function decode(token) {
    const decoded = jwtDecode(token);
    return decoded;
}

function isValid(token) {
    return true;
}

const jwtService = {
    decode,
    isValid
};

export default jwtService;
