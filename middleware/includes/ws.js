const debug = require('debug')('mailer:server');
const { Validator } = require('node-input-validator');
const Mailer = require('./Mailer');

module.exports = (req, res, next) => {
    // in case if the client side validation is skipped
    const validation = new Validator(req.body, {
        name: 'required|length:30,3',
        email: 'required|email',
        cc: 'nullable:email',
        bcc: 'nullable:email',
        message: 'required|length:100,10',
    });
    validation.check().then((matched) => {
        if (!matched) {
            if (req.nojs) {
                req.result = false;
                return next();
            }
            return res.status(422).send(validation.errors);
        }

        return Mailer.send(req.body, { retry: 2, retryDelay: 1000 })
            .then((e) => {
                debug(e);
                if (req.nojs) {
                    req.result = true;
                    return next();
                }
                res.status(200).send();
                res.end();
            })
            .catch((e) => {
                debug(e);
                if (req.nojs) {
                    req.result = false;
                    return next();
                }
                res.status(400).send();
                res.end();
            });
    });
};
