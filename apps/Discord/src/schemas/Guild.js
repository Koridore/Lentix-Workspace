"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const GuildSchema = new mongoose_1.Schema({
    guildID: { required: true, type: String },
    options: {
        prefix: { type: String, default: process.env.PREFIX }
    }
});
const GuildModel = (0, mongoose_1.model)("guild", GuildSchema);
exports.default = GuildModel;
