'use strict';

let express = require('express');
let router = express.Router();
let loginService = require('../service/login-service');


router.post('/api/v1/login-service/login', loginService.login);


module.exports = router;