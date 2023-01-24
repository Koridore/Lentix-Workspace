"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Sentry = tslib_1.__importStar(require("@sentry/node"));
const integrations_1 = require("@sentry/integrations");
const validateEnv_1 = require("./utils/validateEnv");
const discord_js_1 = require("discord.js");
const connectDatabase_1 = require("./database/CamperBD/connectDatabase");
const onReady_1 = require("./events/onReady");
const onInteraction_1 = require("./events/onInteraction");
const clientIntents_1 = require("./clientIntents");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
(() => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    (0, validateEnv_1.validateEnv)();
    Sentry.init({
        dsn: process.env.SENTRY_DSN,
        tracesSampleRate: 1.0,
        integrations: [
            new integrations_1.RewriteFrames({
                root: global.__dirname,
            }),
        ]
    });
    console.log("Success! - validated bot token...");
    clientIntents_1.client.on("ready", () => tslib_1.__awaiter(void 0, void 0, void 0, function* () { return yield (0, onReady_1.onReady)(clientIntents_1.client); }));
    console.log("Success! - bot is starting...");
    clientIntents_1.client.on("interactionCreate", (interaction) => tslib_1.__awaiter(void 0, void 0, void 0, function* () { return yield (0, onInteraction_1.onInteraction)(interaction); }));
    clientIntents_1.client.slashCommands = new discord_js_1.Collection();
    clientIntents_1.client.commands = new discord_js_1.Collection();
    clientIntents_1.client.cooldowns = new discord_js_1.Collection();
    yield (0, connectDatabase_1.connectDatabase)();
    yield clientIntents_1.client.login(process.env.TOKEN);
}))();
