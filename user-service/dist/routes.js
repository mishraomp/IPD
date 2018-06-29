"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
var tsoa_1 = require("tsoa");
var ioc_1 = require("./config/ioc");
var user_controller_1 = require("./controller/user-controller");
var models = {
    "UserModel": {},
};
function RegisterRoutes(app) {
    app.post('/api/user-service', function (request, response, next) {
        var args = {
            user: { "in": "body", "name": "user", "required": true, "ref": "UserModel" },
        };
        var validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request);
        }
        catch (err) {
            return next(err);
        }
        var controller = ioc_1.iocContainer.get(user_controller_1.UserController);
        if (typeof controller['setStatus'] === 'function') {
            controller.setStatus(undefined);
        }
        var promise = controller.login.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, next);
    });
    function promiseHandler(controllerObj, promise, response, next) {
        return Promise.resolve(promise)
            .then(function (data) {
            var statusCode;
            if (controllerObj instanceof tsoa_1.Controller) {
                var controller = controllerObj;
                var headers_1 = controller.getHeaders();
                Object.keys(headers_1).forEach(function (name) {
                    response.set(name, headers_1[name]);
                });
                statusCode = controller.getStatus();
            }
            if (data || data === false) { // === false allows boolean result
                response.status(statusCode || 200).json(data);
            }
            else {
                response.status(statusCode || 204).end();
            }
        })
            .catch(function (error) { return next(error); });
    }
    function getValidatedArgs(args, request) {
        var fieldErrors = {};
        var values = Object.keys(args).map(function (key) {
            var name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return tsoa_1.ValidateParam(args[key], request.query[name], models, name, fieldErrors);
                case 'path':
                    return tsoa_1.ValidateParam(args[key], request.params[name], models, name, fieldErrors);
                case 'header':
                    return tsoa_1.ValidateParam(args[key], request.header(name), models, name, fieldErrors);
                case 'body':
                    return tsoa_1.ValidateParam(args[key], request.body, models, name, fieldErrors, name + '.');
                case 'body-prop':
                    return tsoa_1.ValidateParam(args[key], request.body[name], models, name, fieldErrors, 'body.');
            }
        });
        if (Object.keys(fieldErrors).length > 0) {
            throw new tsoa_1.ValidateError(fieldErrors, '');
        }
        return values;
    }
}
exports.RegisterRoutes = RegisterRoutes;
//# sourceMappingURL=routes.js.map