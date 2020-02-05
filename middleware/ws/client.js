const config = require('./config');

class Client {
    constructor() {
        this.client = config;
    }

    get(url, conf = {}) {
        return this.client
            .get(url, conf)
            .then((response) => Promise.resolve(response))
            .catch((error) => Promise.reject(error));
    }

    post(url, data, conf = {}) {
        return this.client
            .post(url, data, conf)
            .then((response) => Promise.resolve(response))
            .catch((error) => Promise.reject(error));
    }
}

module.exports = new Client();
