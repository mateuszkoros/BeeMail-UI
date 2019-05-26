const backendUrl = 'https://127.0.0.1:1944/';

export const environment = {
    production: true,
    getAddressesUrl: backendUrl + 'addresses',
    getMessagesUrl: backendUrl + 'get',
    sendMessageUrl: backendUrl + 'send',
    deleteMessageUrl: backendUrl + 'delete'
};
