const path = require('path');
const yaml = require('js-yaml');
const fs = require('fs');
const config = JSON.parse(
    JSON.stringify(
        yaml.safeLoad(
            fs.readFileSync(
                path.join(__dirname, '../../config/config.yml'),
                'utf8',
            ),
        )[process.env.NODE_ENV || 'development'],
    ),
);
const client = require('../ws/client');
const querystring = require('querystring');

/**
 * This class is used for all the MAILGUN email transactions
 *
 * @class Mailgun
 */
class Mailgun {
    /**
     * Instantiating the object with the webservice URI and auth
     */
    constructor() {
        this.options = {
            uri: `${config.email.mailgun.host}/v3/${process.env.MG_DOMAIN ||
                config.email.mailgun.domain}/messages`,
            auth: {
                username: 'api',
                password:
                    process.env.MG_PRIVATE_KEY ||
                    config.email.mailgun.privateAPIKey,
            },
        };
    }

    /**
     * Sending an email with the given data
     *
     * @method send
     * @param { Object } data - The data that contains name, email and the message
     * @return { Promise } - The client's POST method promise
     */
    send(data) {
        const payload = {
            from: config.email.from,
            to: `${data.name}<${data.email}>`,
            subject: config.email.subject,
            text: `${data.message}`,
        };

        // the optional CC field
        if (data.cc) {
            payload.cc = data.cc;
        }

        // the optional BCC field
        if (data.bcc) {
            payload.bcc = data.bcc;
        }

        return client.post(this.options.uri, querystring.stringify(payload), {
            method: 'POST',
            auth: this.options.auth,
        });
    }
}

module.exports = new Mailgun();
