'use strict';
let _     = require('lodash');
let logger = require('./app/config/loggerConfig.js');
let express = require('express');
let bodyParser = require('body-parser');
let mockserverroutes = require('./app/routes/login-routes');
let app;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
 
exports.init = async () => {
    app = express();
    
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.use(bodyParser.json({limit: '16mb'})); //for dealing with posted JSON data via the req.body property. Limits the JSON request size.
    app.use(bodyParser.urlencoded({
      extended: true, //better parsing, using the qs library
      limit: '10kb' //limits query request size
    }));
    app.use(handleJsonErrors);
    app.use(mockserverroutes);

  app.use(function (req, res, next) { // jshint ignore:line
    logger.httpLogger.info({req: req}, 'Received Request');
    let errorCode = 404; //Route not found, catch 404 and no further forwarding.
    let responseJson = {
      code: errorCode,
      message: 'Resource not found.'
    };
    res.status(errorCode).json(responseJson);
    logger.httpLogger.info({res: res}, responseJson);
  });

  app.use(function (err, req, res) { //No stack traces leaked to user
    logger.httpLogger.info({req: req}, 'Received Request');
    logger.appLogger.warn('Express catch all error handler. From IP [' + req.ip + '] ' + err);
    let responseJson = {
      code: err.status,
      message: err.message
    };
    res.status(err.status).json(responseJson);
    logger.httpLogger.info({res: res}, responseJson);
  });
  app.set('port', 3000);              //set port in Express
  let env="local";
  let server = app.listen(app.get('port'), function () {

  logger.appLogger.info('SERVER STARTED -- listening on ' + server.address().address + ' port ' + server.address().port);
  if (env === 'production') {
      logger.appLogger.info('RUNNING IN PRODUCTION MODE');
  }
  });
  module.exports = app;
  return app;
}


/**
 * Util to trap JSON errors BEFORE they reach the application router.
 * Checks for syntax errors (e.g. missing quotes) and the maximum payload size
 * accepted. Other errors are passed down the chain with next(err).
 * If there's an error, a response is sent immediately and
 * further server processing stops.
 *
 * @param err - Express error object
 * @param req - the HTTP request
 * @param res - the HTTP response
 * @param next - callback to continue processing to the next midddleware function.
 */

function handleJsonErrors(err, req, res, next) {
    if (err) {
      logger.httpLogger.info({req: req}, 'Received Request');
      let errorMessage, exception;
      if (err instanceof SyntaxError) {
        errorMessage = 'Invalid JSON. The passed JSON contains syntax errors and it can\'t be processed.';
        exception = 'JsonSyntaxErrorException';
  
      } else if (err.type === 'entity.too.large') {
        errorMessage = 'The passed JSON is too large and it won\'t be processed. The submitted size is {' +
            'length} bytes and the limit is {limit} bytes.', {
          length: _.get(err, 'length', '-'),
          limit: _.get(err, 'limit', '-')
        };
        exception = 'JsonTooLargeException';
  
      } else {
        next(err); //everything else, dispatch to the next error handler
        return;
      }
      let responseJson = {
        code: err.status,
        message: errorMessage,
        exception: exception
      };
      res.status(err.status).json(responseJson);
      logger.httpLogger.info({res: res}, responseJson);
    } else { //no error
      next();
    }
  }