"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Logger = require("bunyan");
var nconf = require("nconf");
var RotatingFileStream = require("bunyan-rotating-file-stream");
var appLoggerOptions;
var httpLoggerOptions;
var LoggerConfig = /** @class */ (function () {
    function LoggerConfig() {
        this.appLogger = Logger.createLogger(appLoggerOptions);
        this.reqRspLogger = Logger.createLogger(httpLoggerOptions);
    }
    LoggerConfig.initializeLogger = function () {
        var env = nconf.get("NODE_ENV");
        if ("test" === env) {
            appLoggerOptions = {
                name: nconf.get("MICRO_SERVICE_CODE"),
                serializers: Logger.stdSerializers,
                src: true,
                streams: [
                    {
                        level: Logger.FATAL,
                        stream: process.stdout
                    }
                ]
            };
            httpLoggerOptions = {
                name: nconf.get("MICRO_SERVICE_CODE"),
                src: true,
                streams: [
                    {
                        level: Logger.FATAL,
                        stream: process.stdout
                    }
                ],
                serializers: {
                    req: reqSerializer,
                    res: resSerializer
                }
            };
        }
        else {
            appLoggerOptions = {
                name: nconf.get("MICRO_SERVICE_CODE"),
                serializers: Logger.stdSerializers,
                src: true,
                streams: [
                    {
                        level: Logger.TRACE,
                        stream: process.stdout
                    },
                    {
                        level: Logger.TRACE,
                        stream: new RotatingFileStream({
                            path: nconf.get("LOG_CONFIG:APP_TRACE_LOGGER_FILE_PATH"),
                            period: "1d",
                            totalFiles: 10,
                            rotateExisting: true,
                            threshold: "10m",
                            totalSize: "20m",
                            gzip: true
                        })
                    },
                    {
                        level: Logger.DEBUG,
                        stream: process.stdout
                    },
                    {
                        level: Logger.DEBUG,
                        stream: new RotatingFileStream({
                            path: nconf.get("LOG_CONFIG:APP_DEBUG_LOGGER_FILE_PATH"),
                            period: "1d",
                            totalFiles: 10,
                            rotateExisting: true,
                            threshold: "10m",
                            totalSize: "20m",
                            gzip: true
                        })
                    },
                    {
                        level: Logger.INFO,
                        stream: process.stdout
                    },
                    {
                        level: Logger.INFO,
                        stream: new RotatingFileStream({
                            path: nconf.get("LOG_CONFIG:APP_INFO_LOGGER_FILE_PATH"),
                            period: "1d",
                            totalFiles: 10,
                            rotateExisting: true,
                            threshold: "10m",
                            totalSize: "20m",
                            gzip: true
                        })
                    },
                    {
                        level: Logger.WARN,
                        stream: process.stdout
                    },
                    {
                        level: Logger.WARN,
                        stream: new RotatingFileStream({
                            path: nconf.get("LOG_CONFIG:APP_WARN_LOGGER_FILE_PATH"),
                            period: "1d",
                            totalFiles: 10,
                            rotateExisting: true,
                            threshold: "10m",
                            totalSize: "20m",
                            gzip: true
                        })
                    },
                    {
                        level: Logger.ERROR,
                        stream: process.stdout
                    },
                    {
                        level: Logger.ERROR,
                        stream: new RotatingFileStream({
                            path: nconf.get("LOG_CONFIG:APP_ERROR_LOGGER_FILE_PATH"),
                            period: "1d",
                            totalFiles: 10,
                            rotateExisting: true,
                            threshold: "10m",
                            totalSize: "20m",
                            gzip: true
                        })
                    },
                    {
                        level: Logger.FATAL,
                        stream: process.stdout
                    },
                    {
                        level: Logger.FATAL,
                        stream: new RotatingFileStream({
                            path: nconf.get("LOG_CONFIG:APP_FATAL_LOGGER_FILE_PATH"),
                            period: "1d",
                            totalFiles: 10,
                            rotateExisting: true,
                            threshold: "10m",
                            totalSize: "20m",
                            gzip: true
                        })
                    }
                ]
            };
            httpLoggerOptions = {
                name: nconf.get("MICRO_SERVICE_CODE"),
                src: true,
                serializers: {
                    req: reqSerializer,
                    res: resSerializer
                },
                streams: [
                    {
                        level: Logger.TRACE,
                        stream: process.stdout
                    },
                    {
                        level: Logger.TRACE,
                        stream: new RotatingFileStream({
                            path: nconf.get("LOG_CONFIG:REQ_RSP_TRACE_LOGGER_FILE_PATH"),
                            period: "1d",
                            totalFiles: 10,
                            rotateExisting: true,
                            threshold: "10m",
                            totalSize: "20m",
                            gzip: true
                        })
                    },
                    {
                        level: Logger.DEBUG,
                        stream: process.stdout
                    },
                    {
                        level: Logger.DEBUG,
                        stream: new RotatingFileStream({
                            path: nconf.get("LOG_CONFIG:REQ_RSP_DEBUG_LOGGER_FILE_PATH"),
                            period: "1d",
                            totalFiles: 10,
                            rotateExisting: true,
                            threshold: "10m",
                            totalSize: "20m",
                            gzip: true
                        })
                    },
                    {
                        level: Logger.INFO,
                        stream: process.stdout
                    },
                    {
                        level: Logger.INFO,
                        stream: new RotatingFileStream({
                            path: nconf.get("LOG_CONFIG:REQ_RSP_INFO_LOGGER_FILE_PATH"),
                            period: "1d",
                            totalFiles: 10,
                            rotateExisting: true,
                            threshold: "10m",
                            totalSize: "20m",
                            gzip: true
                        })
                    },
                    {
                        level: Logger.WARN,
                        stream: process.stdout
                    },
                    {
                        level: Logger.WARN,
                        stream: new RotatingFileStream({
                            path: nconf.get("LOG_CONFIG:REQ_RSP_WARN_LOGGER_FILE_PATH"),
                            period: "1d",
                            totalFiles: 10,
                            rotateExisting: true,
                            threshold: "10m",
                            totalSize: "20m",
                            gzip: true
                        })
                    },
                    {
                        level: Logger.ERROR,
                        stream: process.stdout
                    },
                    {
                        level: Logger.ERROR,
                        stream: new RotatingFileStream({
                            path: nconf.get("LOG_CONFIG:REQ_RSP_ERROR_LOGGER_FILE_PATH"),
                            period: "1d",
                            totalFiles: 10,
                            rotateExisting: true,
                            threshold: "10m",
                            totalSize: "20m",
                            gzip: true
                        })
                    },
                    {
                        level: Logger.FATAL,
                        stream: process.stdout
                    },
                    {
                        level: Logger.FATAL,
                        stream: new RotatingFileStream({
                            path: nconf.get("LOG_CONFIG:REQ_RSP_FATAL_LOGGER_FILE_PATH"),
                            period: "1d",
                            totalFiles: 10,
                            rotateExisting: true,
                            threshold: "10m",
                            totalSize: "20m",
                            gzip: true
                        })
                    }
                ]
            };
        }
    };
    return LoggerConfig;
}());
exports.LoggerConfig = LoggerConfig;
var reqSerializer = function (req) {
    return {
        method: req.method,
        url: req.url,
        headers: req.headers,
        body: req.body
    };
};
var resSerializer = function (res) {
    return {
        headers: res._headers,
        body: res.json,
        status: res.status
    };
};
//# sourceMappingURL=logger-config.js.map