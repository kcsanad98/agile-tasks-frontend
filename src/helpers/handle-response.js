import * as MESSAGES from '../constants/messages';

export default async function handleResponse(response) {
    console.log(response.body);
    const responseText = response.text();
    if (!responseText) {
        throw new Error(MESSAGES.ERROR_NO_RESPONSE);
    }
    const responseData = JSON.parse(responseText);
    if (!response.ok) {
        const error = (responseData && responseData.message) || response.statusText;
        throw new Error(error);
    }
    console.log(responseData);
    return responseData;
}
