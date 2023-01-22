import * as Sentry from "@sentry/node";
import { RewriteFrames } from "@sentry/integrations";
import { validateEnv } from "./utils/validateEnv";
// import { validator } from "envalid";

import {
    Client,ClientOptions, GatewayIntentBits, Collection,PermissionFlagsBits,
    ClientApplication,InteractionType,Interaction,CommandInteraction,
    Partials,ButtonInteraction,ModalSubmitInteraction,SelectMenuInteraction,
} from "discord.js";

import { connectDatabase } from "./database/connectDatabase";

import { onReady } from "./events/onReady";
import { onInteraction } from "./events/onInteraction";

import { IntentOptions } from "./config/IntentOptions";

import { Command, SlashCommand } from "../../Discord/src/types";

import * as dotenv from "dotenv";
dotenv.config()

import { readdirSync } from "fs";
import { join } from "path";

(async () => {
    validateEnv();
  
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      tracesSampleRate: 1.0,
      integrations: [
        new RewriteFrames({
          root: global.__dirname,
        }),
      ],
    });

    function validateEnv() {
        throw new Error("Function not implemented.");
    }

const {Guilds, MessageContent, GuildMessages, GuildMembers} = GatewayIntentBits

const client = new Client({
    intents:[
        Guilds, 
        MessageContent, 
        GuildMessages, 
        GuildMembers
    ]
})

client.on("ready", async () => await onReady(client));

console.log("Bot is starting...");

client.on(
    "interactionCreate",
    async (interaction) => await onInteraction(interaction)
  );

client.slashCommands = new Collection<string, SlashCommand>()
client.commands = new Collection<string, Command>()
client.cooldowns = new Collection<string, number>()

const handlersDir = join(__dirname, "./handlers")
readdirSync(handlersDir).forEach(handler => {
    require(`${handlersDir}/${handler}`)(client)
})

console.log(client);

await connectDatabase();

await client.login(process.env.TOKEN as string)

})();
