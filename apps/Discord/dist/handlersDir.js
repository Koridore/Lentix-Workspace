"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlersDir = void 0;
const clientIntents_1 = require("../src/clientIntents");
const fs_1 = require("fs");
const path_1 = require("path");
exports.handlersDir = (0, path_1.join)(__dirname, "./handlers");
(0, fs_1.readdirSync)(exports.handlersDir).forEach(handler => {
    require(`${exports.handlersDir}/${handler}`)(clientIntents_1.client);
});
console.log(clientIntents_1.client);
