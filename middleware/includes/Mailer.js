const debug = require('debug')('mailer:server');
const Mailgun = require('../apis/Mailgun');
const SendGrid = require('../apis/SendGrid');

/**
 * This is a generic mailer class
 *
 * @class Mailer
 */
class Mailer {
    /**
     * stacking all the supported mail clients
     */
    constructor() {
        this.mailerInstances = [SendGrid, Mailgun];
    }

    /**
     * Sending an email with the given data using any of the supported mail clients
     *
     * @method send
     * @param { Object } data - The data that contains name, email and the message
     * @param { Object } [config={ retry: 2, retryDelay: 1000 }] - The retry configuration
     * @return { Promise } - The client's POST method promise
     */
    send(data, config) {
        return new Promise((resolve, reject) => {
            return this.mailerInstances[0]
                .send(data)
                .then((e) => {
                    debug(
                        `${this.mailerInstances[0].constructor.name}: mail is successfully sent`,
                    );
                    resolve(e);
                })
                .catch((e) => {
                    // if retry config does not exist or the retry option is not set, reject
                    if (!config || !config.retry) {
                        debug(
                            `${this.mailerInstances[0].constructor.name}: retry option is not requested`,
                        );
                        reject(e);
                    }

                    // setting the variable for keeping track of the retry count
                    config.__retryCount = config.__retryCount || 0;

                    // checking if we've maxed out the total number of retries
                    if (config.__retryCount >= config.retry) {
                        debug(
                            `${this.mailerInstances[0].constructor.name}: retries maxed out`,
                        );
                        if (this.mailerInstances.length > 1) {
                            this.mailerInstances.shift();
                            config.__retryCount = 0;
                            debug(
                                `Good news! ${this.mailerInstances[0].constructor.name} is in action`,
                            );
                        } else {
                            // if all the mailers are maxed out
                            return Promise.reject(e);
                        }
                    }

                    // increasing the retry count
                    config.__retryCount += 1;

                    // introduce a delay in executing the new request
                    let backoff = new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                        }, config.retryDelay || 1000);
                    });

                    // the promise in which recalls send method to retry the request
                    return backoff.then(() => {
                        return this.send(data, config);
                    });
                })
                .then((e) => resolve(e))
                .catch((e) => {
                    reject(e);
                });
        }).catch((e) => {
            return Promise.reject(e);
        });
    }
}

module.exports = new Mailer();
