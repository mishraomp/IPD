'use strict'

let bunyan = require('bunyan');

let appLoggerOptions = {
    name: 'IPD-Login-Service',
    src: true,
    streams: [
        {
            level: 'trace',
            stream: process.stdout // log INFO and above to stdout
        }
    ]
};
let httpLoggerOptions = {
    name: 'IPD-Login-Service',
    src: true,
    streams: [
        {
            level: 'trace',
            stream: process.stdout // log INFO and above to stdout
        }
    ],
    serializers: {
        req: reqSerializer,
        res: resSerializer
    }
};

let appLogger = bunyan.createLogger(appLoggerOptions);
let httpLogger = bunyan.createLogger(httpLoggerOptions);

function reqSerializer(req) {
    return {method: req.method, url: req.url, headers: req.headers, body: req.body};
}
function resSerializer(res) {
    return {
        headers: res._headers,
        body: res.json || res.body,
        status: res.status
    };
}
module.exports = {
    appLogger: appLogger,
    httpLogger: httpLogger
};