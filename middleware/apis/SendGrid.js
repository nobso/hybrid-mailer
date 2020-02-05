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

/**
 * This class is used for all the SendGrid email transactions
 *
 * @class SendGrid
 */
class SendGrid {
    /**
     * Instantiating the object with the webservice URI and auth
     */
    constructor() {
        this.options = {
            uri: `${config.email.sendgrid.host}/v3/mail/send`,
            headers: {
                Authorization: `Bearer ${process.env.SG_PRIVATE_KEY ||
                    config.email.sendgrid.privateAPIKey}`,
                'Content-Type': 'application/json',
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
            from: { email: config.email.from },
            personalizations: [
                { to: [{ email: `${data.name}<${data.email}>` }] },
            ],
            subject: config.email.subject,
            content: [
                {
                    type: 'text/plain',
                    value: `${data.message}`,
                },
            ],
        };

        // the optional CC field
        if (data.cc) {
            payload.personalizations[0].cc = [{ email: data.cc }];
        }

        // // the optional BCC field
        if (data.bcc) {
            payload.personalizations[0].bcc = [{ email: data.bcc }];
        }

        return client.post(this.options.uri, JSON.stringify(payload), {
            method: 'POST',
            headers: this.options.headers,
        });
    }
}

module.exports = new SendGrid();
