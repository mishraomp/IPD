"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nconf = require("nconf");
try {
    // Read in Node environment variables
    nconf.env();
    var applicationConfigPath = "./dist/config/application.json";
    // Read application config values into nconf
    nconf.file(applicationConfigPath);
}
catch (error) {
    throw error;
}
var Config = /** @class */ (function () {
    function Config() {
    }
    Config.get = function (key) {
        return nconf.get(key);
    };
    return Config;
}());
exports.Config = Config;
//# sourceMappingURL=config.js.map