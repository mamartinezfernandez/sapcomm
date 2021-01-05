/* Routes APP based in express */

/* Imports */
const express = require('express');
const router = express.Router();
const getRepoRootContentController = require('../controllers/getRepoRootContent-controller');

/* Endpoints published */
router.get('/getRepoRootContent', getRepoRootContentController.getRepoRootContent);


module.exports = router;