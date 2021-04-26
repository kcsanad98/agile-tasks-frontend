import config from '../constants/config';
import authenticationService from './authentication.service';

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

async function post(requestUrl, requestBody) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
    };
    const response = await fetch(serverUrl + requestUrl, requestOptions);
    return handleResponse(response);
}

const backendService = {
    post
};

export default backendService;
