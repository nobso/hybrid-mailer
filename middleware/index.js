// middleware like webserce, locale detection, config loader etc
let ws = require('./includes/ws'),
    mw = {};
mw.ws = () => ws;

module.exports = mw;
