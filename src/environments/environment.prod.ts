const backendUrl = 'https://localhost:1944/';

export const environment = {
    production: true,
    getAddressesUrl: backendUrl + 'addresses',
    getMessagesUrl: backendUrl + 'get',
    sendMessageUrl: backendUrl + 'send',
    deleteMessageUrl: backendUrl + 'delete'
};
