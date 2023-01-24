"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onInteraction = void 0;
const tslib_1 = require("tslib");
const _CommandList_1 = require("../commands/_CommandList");
const errorHandler_1 = require("../utils/errorHandler");
const onInteraction = (interaction) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        if (interaction.isCommand()) {
            for (const Command of _CommandList_1.CommandList) {
                if (interaction.commandName === Command.data.name) {
                    yield Command.run(interaction);
                    break;
                }
            }
        }
    }
    catch (err) {
        (0, errorHandler_1.errorHandler)("onInteraction event", err);
    }
});
exports.onInteraction = onInteraction;
