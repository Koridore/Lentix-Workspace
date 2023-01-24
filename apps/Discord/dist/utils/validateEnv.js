"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEnv = void 0;
const logHandler_1 = require("./logHandler");
const validateEnv = () => {
    if (!process.env.BOT_TOKEN) {
        logHandler_1.logHandler.log("warn", "Missing Discord bot token.");
        process.exit(1);
    }
    if (!process.env.MONGO_URI) {
        logHandler_1.logHandler.log("warn", "Missing MongoDB connection.");
        process.exit(1);
    }
};
exports.validateEnv = validateEnv;
