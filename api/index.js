/**
 * API main
 *
 */
var express = require('express');
var api = express.Router();
var bodyParser = require('body-parser');
var errorLogger = require('./middlewares/error-logger.js');
var errorHandler = require('./middlewares/error-handler.js');
var v1 = require('./v1');
var unmatchedRouteHandler = require('./middlewares/unmatched-route-handler.js');

api.use(bodyParser.json({
    strict: true
}));
api.use(errorLogger);
api.use(errorHandler);
api.use('/v1', v1);
api.use(unmatchedRouteHandler);

module.exports = api;