"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultError = exports.errorHandler = void 0;
var errorHandler = function (err, res, req) {
    return res.status(400).json({
        message: "Validation failed",
        success: false,
        error: {
            name: "ValidationError",
            errors: err.errors.reduce(function (acc, err) {
                var _a, _b;
                var path = (_a = err === null || err === void 0 ? void 0 : err.path) === null || _a === void 0 ? void 0 : _a.join(".");
                acc[path] = {
                    properties: {
                        message: err === null || err === void 0 ? void 0 : err.message,
                        type: err === null || err === void 0 ? void 0 : err.type,
                        min: err === null || err === void 0 ? void 0 : err.minimum,
                    },
                    kind: err === null || err === void 0 ? void 0 : err.type,
                    path: err === null || err === void 0 ? void 0 : err.path[0],
                    value: ((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b[err === null || err === void 0 ? void 0 : err.path[0]]) || (err === null || err === void 0 ? void 0 : err.path[0]),
                };
                return acc;
            }, {}),
        },
    });
};
exports.errorHandler = errorHandler;
var defaultError = function (err, res) {
    return res.status(500).json({
        message: "Something went wrong",
        success: false,
        error: err.message || err,
    });
};
exports.defaultError = defaultError;
