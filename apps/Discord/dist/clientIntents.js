"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const discord_js_1 = require("discord.js");
const { Guilds, MessageContent, GuildMessages, GuildMessageReactions, GuildMessageTyping, DirectMessages, DirectMessageReactions, DirectMessageTyping, GuildMembers } = discord_js_1.GatewayIntentBits;
exports.client = new discord_js_1.Client({
    intents: [
        Guilds,
        MessageContent,
        GuildMessages,
        GuildMessageReactions,
        GuildMessageTyping,
        DirectMessages,
        DirectMessageReactions,
        DirectMessageTyping,
        GuildMembers
    ],
    partials: [
        discord_js_1.Partials.Channel,
    ],
});
