"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const tslib_1 = require("tslib");
const Sentry = tslib_1.__importStar(require("@sentry/node"));
const logHandler_1 = require("./logHandler");
const errorHandler = (context, err) => {
    const error = err;
    logHandler_1.logHandler.log("error", `There was an error in the ${context}:`);
    logHandler_1.logHandler.log("error", JSON.stringify({ errorMessage: error.message, errorStack: error.stack }));
    Sentry.captureException(error);
};
exports.errorHandler = errorHandler;
