"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var inversify_1 = require("inversify");
var user_controller_1 = require("../controller/user-controller");
exports.iocContainer = new inversify_1.Container();
exports.iocContainer.bind("IUserController").to(user_controller_1.UserController);
//# sourceMappingURL=ioc.js.map