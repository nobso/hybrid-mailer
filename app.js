const express = require('express');
const path = require('path');
const logger = require('morgan');
const middleware = require('./middleware');

// these modules/files contain code for handling particular sets of related "routes" (URL paths)
const indexRouter = require('./routes/index');

// creating a express based nodejs app
const app = express();

// to extract the POST body content
app.use(express.urlencoded({ extended: false }));

// view engine setup - using Pug (previously known as Jade)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// create the log entries based on 'short' option
app.use(logger('short'));

// to serve all the static files (images, CSS etc) in the /public directory in the project root
app.use(express.static(path.join(__dirname, 'dist')));

// all the webservice requests will be served from here
app.use('/ws/:service(sendmail)', middleware.ws());

// all other requests including the 404
app.all('/*', indexRouter);

module.exports = app;
