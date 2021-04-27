import config from '../constants/config';
import authenticationService from './authentication.service';
import localStorageService from './local-storage.service';

const serverConfig = config.server;
const serverUrl = `${serverConfig.protocol}://${serverConfig.host}:${serverConfig.port}`;

async function handleResponse(response) {
    const responseText = await response.text();
    let responseData = {};
    if (responseText) {
        responseData = JSON.parse(responseText);
    }
    if (!response.ok) {
        if ([401, 403].includes(response.status)) {
            authenticationService.logout();
            window.location.reload();
        }
        const error = (responseData && responseData.message) || response.statusText;
        throw new Error(error);
    }
    return responseData;
}

function assembleRequestHeaders() {
    const requestHeaders = { 'Content-Type': 'application/json' };
    const currentUser = localStorageService.getStoredUser();
    if (currentUser) {
        requestHeaders.Authorization = `Bearer ${currentUser.token}`;
    }
    return requestHeaders;
}

async function sendRequest(requestUrl, requestOptions) {
    requestOptions.headers = assembleRequestHeaders();
    const response = await fetch(serverUrl + requestUrl, requestOptions);
    return handleResponse(response);
}

async function get(requestUrl) {
    const requestOptions = {
        method: 'GET'
    };
    return sendRequest(requestUrl, requestOptions);
}

async function post(requestUrl, requestBody) {
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(requestBody)
    };
    return sendRequest(requestUrl, requestOptions);
}

async function put(requestUrl, requestBody) {
    const requestOptions = {
        method: 'PUT',
        body: JSON.stringify(requestBody)
    };
    return sendRequest(requestUrl, requestOptions);
}

async function del(requestUrl) {
    const requestOptions = {
        method: 'DELETE'
    };
    return sendRequest(requestUrl, requestOptions);
}

const backendService = {
    get,
    post,
    put,
    del
};

export default backendService;
