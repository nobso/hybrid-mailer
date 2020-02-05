const axios = require('axios');

let instance = axios.create({
    // `baseURL` will be prepended to `url` unless `url` is absolute.
    baseURL: 'https://api.mailgun.net',

    // `timeout` specifies the number of milliseconds before the request times out.
    timeout: 4000,

    // `transformRequest` allows changes to the request data before it is sent to the server
    transformRequest: [
        function(data) {
            return data;
        },
    ],

    // `transformResponse` allows changes to the response data to be made before
    transformResponse: [
        function(data) {
            return data;
        },
    ],

    // `maxContentLength` defines the max size (bytes) of the http response content allowed
    maxContentLength: 10000,

    // `responseType` indicates the type of data that the server will respond with
    // options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    responseType: 'json', // default
});

module.exports = instance;
