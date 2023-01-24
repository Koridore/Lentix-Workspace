"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = require("mongoose");
const errorHandler_1 = require("./utils/errorHandler");
const logHandler_1 = require("./utils/logHandler");
const connectDatabase = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, mongoose_1.connect)(process.env.MONGO_URI);
        logHandler_1.logHandler.log("info", "Database connection successful.");
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)("database connection", error);
    }
});
exports.connectDatabase = connectDatabase;
