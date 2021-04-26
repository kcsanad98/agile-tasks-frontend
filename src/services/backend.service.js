import config from '../constants/config';
import * as MESSAGES from '../constants/messages';

const serverConfig = config.server;
const serverUrl = `${serverConfig.protocol}://${serverConfig.host}:${serverConfig.port}`;

async function handleResponse(response) {
    const responseText = await response.text();
    if (!responseText) {
        throw new Error(MESSAGES.ERROR_NO_RESPONSE);
    }
    const responseData = JSON.parse(responseText);
    if (!response.ok) {
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
