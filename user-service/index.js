'use strict';
/**
 * Application's entry point
 * @author Omprakash Mishra
 */
let application = require('./application.js');

application.init()
    .then(function () {
    })
    .catch(function (err) {
        console.log(err);
        process.exit(1);
    });

    process.on('unhandledRejection', (reason, p) => {
        console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
        // application specific logging, throwing an error, or other logic here
      });
