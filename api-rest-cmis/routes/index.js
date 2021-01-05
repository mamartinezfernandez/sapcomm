/* Main Routes APP index based in express */

/* Imports*/
const express = require('express');

/* App use */
const app = express();
app.use( '/', require('./services') );

module.exports = app;