"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config/config");
var app_1 = require("./config/app");
var logger_config_1 = require("./config/logger-config");
var Server = /** @class */ (function () {
    function Server() {
        var _this = this;
        logger_config_1.LoggerConfig.initializeLogger();
        this.app = new app_1.App();
        var webServer = this.app.application.listen(this.app.application.get("port"), function () {
            if (config_1.Config.get("NODE_ENV") === "local") {
                new logger_config_1.LoggerConfig().appLogger.info("Login Service is running at http://localhost:" + _this.app.application.get("port") + " .");
                new logger_config_1.LoggerConfig().appLogger.info("Press CTRL-C to stop\n");
            }
            else {
                new logger_config_1.LoggerConfig().appLogger.info("Login Service is running at http://localhost:" + _this.app.application.get("port") + " .");
            }
        });
    }
    Server.start = function () {
        var newServer = new Server();
        return newServer.app;
    };
    return Server;
}());
exports.Server = Server;
exports.server = Server.start();
var handleUncaughtException = function (err) {
    if (err.errno === "EADDRINUSE") {
        console.error("Port  is already being used. Have you started the same Node JS instance twice? Try a different HTTP_PORT.");
        setTimeout(function () {
            process.exit(1);
        }, 500);
    }
    else {
        console.error("There was an uncaught exception.", err);
    }
};
process.on("unhandledRejection", function (reason, p) {
    console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
});
process.on("uncaughtException", handleUncaughtException);
//# sourceMappingURL=server.js.map