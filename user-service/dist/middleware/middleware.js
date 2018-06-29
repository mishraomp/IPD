"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncExpressFunction = function (fn) {
    return function (req, res, next) {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
//# sourceMappingURL=middleware.js.map