import * as Logger from "bunyan";
import * as nconf from "nconf";
import * as RotatingFileStream from "bunyan-rotating-file-stream";
let appLoggerOptions: Logger.LoggerOptions;
let httpLoggerOptions: Logger.LoggerOptions;
export class LoggerConfig {

  public static initializeLogger(): void {
    const env = nconf.get("NODE_ENV");
    if ("test" === env) {
      appLoggerOptions = {
        name: nconf.get("MICRO_SERVICE_CODE"),
        serializers: Logger.stdSerializers,
        src: true,
        streams: [
          {
            level: Logger.FATAL,
            stream: process.stdout
          }]
      };
      httpLoggerOptions = {
        name: nconf.get("MICRO_SERVICE_CODE"),
        src: true,
        streams: [
          {
            level: Logger.FATAL,
            stream: process.stdout
          }],
        serializers: {
          req: reqSerializer,
          res: resSerializer
        }
      };
    } else {
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
              path: nconf.get("LOG_CONFIG:APP_TRACE_LOGGER_FILE_PATH"), // log to a file,
              period: "1d",          // daily rotation
              totalFiles: 10,        // keep up to 10 back copies
              rotateExisting: true,  // Give ourselves a clean file when we start up, based on period
              threshold: "10m",      // Rotate log files larger than 10 megabytes
              totalSize: "20m",      // Don't keep more than 20mb of archived log files
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
              path: nconf.get("LOG_CONFIG:APP_DEBUG_LOGGER_FILE_PATH"), // log to a file,
              period: "1d",          // daily rotation
              totalFiles: 10,        // keep up to 10 back copies
              rotateExisting: true,  // Give ourselves a clean file when we start up, based on period
              threshold: "10m",      // Rotate log files larger than 10 megabytes
              totalSize: "20m",      // Don't keep more than 20mb of archived log files
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
              path: nconf.get("LOG_CONFIG:APP_INFO_LOGGER_FILE_PATH"), // log to a file,
              period: "1d",          // daily rotation
              totalFiles: 10,        // keep up to 10 back copies
              rotateExisting: true,  // Give ourselves a clean file when we start up, based on period
              threshold: "10m",      // Rotate log files larger than 10 megabytes
              totalSize: "20m",      // Don't keep more than 20mb of archived log files
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
              path: nconf.get("LOG_CONFIG:APP_WARN_LOGGER_FILE_PATH"), // log to a file,
              period: "1d",          // daily rotation
              totalFiles: 10,        // keep up to 10 back copies
              rotateExisting: true,  // Give ourselves a clean file when we start up, based on period
              threshold: "10m",      // Rotate log files larger than 10 megabytes
              totalSize: "20m",      // Don't keep more than 20mb of archived log files
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
              path: nconf.get("LOG_CONFIG:APP_ERROR_LOGGER_FILE_PATH"), // log to a file,
              period: "1d",          // daily rotation
              totalFiles: 10,        // keep up to 10 back copies
              rotateExisting: true,  // Give ourselves a clean file when we start up, based on period
              threshold: "10m",      // Rotate log files larger than 10 megabytes
              totalSize: "20m",      // Don't keep more than 20mb of archived log files
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
              path: nconf.get("LOG_CONFIG:APP_FATAL_LOGGER_FILE_PATH"), // log to a file,
              period: "1d",          // daily rotation
              totalFiles: 10,        // keep up to 10 back copies
              rotateExisting: true,  // Give ourselves a clean file when we start up, based on period
              threshold: "10m",      // Rotate log files larger than 10 megabytes
              totalSize: "20m",      // Don't keep more than 20mb of archived log files
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
              path: nconf.get("LOG_CONFIG:REQ_RSP_TRACE_LOGGER_FILE_PATH"), // log to a file,
              period: "1d",          // daily rotation
              totalFiles: 10,        // keep up to 10 back copies
              rotateExisting: true,  // Give ourselves a clean file when we start up, based on period
              threshold: "10m",      // Rotate log files larger than 10 megabytes
              totalSize: "20m",      // Don't keep more than 20mb of archived log files
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
              path: nconf.get("LOG_CONFIG:REQ_RSP_DEBUG_LOGGER_FILE_PATH"), // log to a file,
              period: "1d",          // daily rotation
              totalFiles: 10,        // keep up to 10 back copies
              rotateExisting: true,  // Give ourselves a clean file when we start up, based on period
              threshold: "10m",      // Rotate log files larger than 10 megabytes
              totalSize: "20m",      // Don't keep more than 20mb of archived log files
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
              path: nconf.get("LOG_CONFIG:REQ_RSP_INFO_LOGGER_FILE_PATH"), // log to a file,
              period: "1d",          // daily rotation
              totalFiles: 10,        // keep up to 10 back copies
              rotateExisting: true,  // Give ourselves a clean file when we start up, based on period
              threshold: "10m",      // Rotate log files larger than 10 megabytes
              totalSize: "20m",      // Don't keep more than 20mb of archived log files
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
              path: nconf.get("LOG_CONFIG:REQ_RSP_WARN_LOGGER_FILE_PATH"), // log to a file,
              period: "1d",          // daily rotation
              totalFiles: 10,        // keep up to 10 back copies
              rotateExisting: true,  // Give ourselves a clean file when we start up, based on period
              threshold: "10m",      // Rotate log files larger than 10 megabytes
              totalSize: "20m",      // Don't keep more than 20mb of archived log files
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
              path: nconf.get("LOG_CONFIG:REQ_RSP_ERROR_LOGGER_FILE_PATH"), // log to a file,
              period: "1d",          // daily rotation
              totalFiles: 10,        // keep up to 10 back copies
              rotateExisting: true,  // Give ourselves a clean file when we start up, based on period
              threshold: "10m",      // Rotate log files larger than 10 megabytes
              totalSize: "20m",      // Don't keep more than 20mb of archived log files
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
              path: nconf.get("LOG_CONFIG:REQ_RSP_FATAL_LOGGER_FILE_PATH"), // log to a file,
              period: "1d",          // daily rotation
              totalFiles: 10,        // keep up to 10 back copies
              rotateExisting: true,  // Give ourselves a clean file when we start up, based on period
              threshold: "10m",      // Rotate log files larger than 10 megabytes
              totalSize: "20m",      // Don't keep more than 20mb of archived log files
              gzip: true
            })
          }
        ]
      };
    }
  }
  public appLogger = Logger.createLogger(appLoggerOptions);
  public reqRspLogger = Logger.createLogger(httpLoggerOptions);
}

const reqSerializer = (req: any) => {
  return {
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body
  };
};

const resSerializer = (res: any) => {
  return {
    headers: res._headers,
    body: res.json,
    status: res.status
  };
};
