'use strict';

const _ = require('lodash');
const logger = require('../config/loggerConfig');
let nconf = require('nconf');

exports.login = (req, res) =>{
    logger.appLogger.trace("Recieved Param",req.params['id']);
    logger.appLogger.trace("Recieved query",req.query['name']);
    logger.appLogger.trace("Recieved query",req.query['age']);
    let responseCode = 200;
    let responseJson =  {
      code: responseCode,
      message: 'The server is up and running.'
    };
    res.status(responseCode).json(responseJson);
  };