"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onReady = void 0;
const tslib_1 = require("tslib");
const errorHandler_1 = require("../utils/errorHandler");
const logHandler_1 = require("../utils/logHandler");
const rest_1 = require("@discordjs/rest");
const v9_1 = require("discord-api-types/v9");
const _CommandList_1 = require("../commands/_CommandList");
const onReady = (BOT) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const rest = new rest_1.REST({ version: "9" }).setToken(process.env.BOT_TOKEN);
        const commandData = [];
        _CommandList_1.CommandList.forEach((command) => commandData.push(command.data.toJSON()));
        yield rest.put(v9_1.Routes.applicationGuildCommands(((_a = BOT.user) === null || _a === void 0 ? void 0 : _a.id) || "missing token", process.env.GUILD_ID), { body: commandData });
        logHandler_1.logHandler.log("info", "Bot has connected to Discord!");
    }
    catch (err) {
        (0, errorHandler_1.errorHandler)("onReady event", err);
    }
});
exports.onReady = onReady;
