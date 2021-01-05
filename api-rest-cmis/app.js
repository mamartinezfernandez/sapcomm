/* Main APP based in express */

/* Imports*/
const express = require('express');
const bodyParser = require('body-parser');

/* App use */
const app = express();
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

/* Routes */
app.use( require('./routes/index') );

/* Port */
app.listen(3000, () => console.log('server started'));