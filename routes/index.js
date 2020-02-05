const express = require('express');
const router = express.Router();
const ws = require('../middleware/includes/ws');

// the main index page (Contact us)
router.get('/', (req, res) => {
    res.render('index', { title: 'Mailer ›› siteminder.com' });
});

// this route will be used when the client (browser) has no JavaScript support
router.post(
    '/sendmail',
    (req, res, next) => {
        req.nojs = true;
        next();
    },
    ws,
    (req, res) => {
        res.render('sendmail', { error: !!req.validation, result: req.result });
    },
);

module.exports = router;
