"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var swaggerUi = require("swagger-ui-express");
var config_1 = require("./config");
var express = require("express");
var router_1 = require("./router");
var App = /** @class */ (function () {
    function App() {
        this.application = express();
        this.application.set("port", config_1.Config.get("server_port"));
        var swaggerDocument = require("../swagger.json");
        this.application.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // Swagger UI
        this.application.use(App.handleJSONParsingErrors); // JSON formatting error handling
        this.application.use(router_1.Router);
        this.application.use(App.catchNotFoundError);
        this.application.use(App.handleError);
    }
    App.handleJSONParsingErrors = function (err, req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (null === req || undefined === req) {
                            return reject(new ReferenceError("req is null or undefined."));
                        }
                        if (null === res || undefined === res) {
                            return reject(new ReferenceError("res is null or undefined."));
                        }
                        if (null === next || undefined === next) {
                            return reject(new ReferenceError("next is null or undefined."));
                        }
                        if (err) {
                            var errorMessage = "";
                            if (err instanceof SyntaxError) {
                                errorMessage = "The JSON provided is malformed and cannot be processed.";
                            }
                            else if (err.hasOwnProperty("type") && err.type === "entity.too.large") {
                                errorMessage = "The JSON provided is is too large and cannot be processed.";
                            }
                            else {
                                return reject(err);
                            }
                            var responseJson = {
                                error: errorMessage
                            };
                            res.status(400).json(responseJson);
                        }
                        return resolve();
                    }).then(function () { return next(); })];
            });
        });
    };
    App.catchNotFoundError = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (!req) {
                            return reject(new ReferenceError("req is null or undefined."));
                        }
                        if (!res) {
                            return reject(new ReferenceError("res is null or undefined."));
                        }
                        if (!next) {
                            return reject(new ReferenceError("next is null or undefined."));
                        }
                        res.status(404);
                        return resolve();
                    })];
            });
        });
    };
    App.handleError = function (err, req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (!req) {
                            return reject(new ReferenceError("req is null or undefined."));
                        }
                        if (!res) {
                            return reject(new ReferenceError("res is null or undefined."));
                        }
                        if (!next) {
                            return reject(new ReferenceError("next is null or undefined."));
                        }
                        var env = config_1.Config.get("NODE_ENV");
                        res.status(500);
                        switch (env) {
                            case "local":
                                {
                                    res.json(err.stack);
                                    break;
                                }
                            default:
                                {
                                    res.send("Internal Server Error");
                                    break;
                                }
                        }
                        return resolve();
                    })];
            });
        });
    };
    return App;
}());
exports.App = App;
//# sourceMappingURL=app.js.map