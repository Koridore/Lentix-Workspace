// Workplace: ~root~ ../apps/Discord/src/index.ts

// Imports - 
import * as Sentry from "@sentry/node"; //
import { RewriteFrames } from "@sentry/integrations"; //

// Utils
import { validateEnv } from "./utils/validateEnv"; // validatEnv

// import { validator } from "envalid"; //

// Discords API
import {
    Client,
    ClientOptions,
    GatewayIntentBits,
    Collection,
    PermissionFlagsBits,
    ClientApplication,
    Interaction,
    InteractionType,
    CommandInteraction,
    ButtonInteraction,
    ModalSubmitInteraction,
    Partials,
} from "discord.js"; //

// Databases
import { connectDatabase } from "./database/connectDatabase";

// Events
import { onReady } from "./events/onReady";
import { onInteraction } from "./events/onInteraction";

// Configs
import { IntentOptions } from "./config/IntentOptions"; // IntentOptions

// Types
import { Command, SlashCommand } from "../../Discord/src/types";

//
import * as dotenv from "dotenv"; // dotenv

dotenv.config() //

// 
import { readdirSync } from "fs";
import { join } from "path";

// Opening validateEnv
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
  }); console.log("Success! - validated bot token..."); //

  // Client Intents
const { Guilds, MessageContent, GuildMessages, GuildMembers } = GatewayIntentBits
const client = new Client({
    intents:[
        Guilds, 
        MessageContent, 
        GuildMessages, 
        GuildMembers
    ]
});

//
client.on("ready", async () => await onReady(client)); console.log("Success! - bot is starting...");

//
client.on("interactionCreate", async (interaction) => await onInteraction(interaction));

//
client.slashCommands = new Collection<string, SlashCommand>()
client.commands = new Collection<string, Command>()
client.cooldowns = new Collection<string, number>()

//Redirects
const handlersDir = join(__dirname, "./handlers")
readdirSync(handlersDir).forEach(handler => {
    require(`${handlersDir}/${handler}`)(client)
}); console.log(client);

// Connections
await connectDatabase(); // Awaiting database connection

await client.login(process.env.TOKEN as string); // Awaiting bots connection

} // Closes validateEnv();

) // Closes (async () => {

(); // Prints Missing Discord bot token error
