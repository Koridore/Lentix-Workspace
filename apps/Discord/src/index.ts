// Workplace: ~root~ ../apps/Discord/src/index.ts

// Imports - 
import * as Sentry from "@sentry/node"; //
import { RewriteFrames } from "@sentry/integrations"; //
import { validateEnv } from "./utils/validateEnv"; // utils/validatEnv
// import { validator } from "envalid"; //
import { //Dependancy for Discord.js API
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
} from "discord.js";
// import { read, readdirSync } from "fs";
// import { join } from "path";
// import { handlersDir } from "../src/handlersDir";
// import { regCMD } from "../src/deploy-commands";
// import { devConfig } from "../devconfig";
import path from "node:path";
import { connectDatabase } from "./database/CamperBD/connectDatabase"; // databases/connectDatabase
import { onReady } from "./events/onReady";// events/onReady
import { onInteraction } from "./events/onInteraction"; // events/onInteraction
// import { IntentOptions } from "./config/IntentOptions"; // configsIntentOptions
import { client } from './clientIntents';
import { Command, SlashCommand } from "../../Discord/src/types"; // types
import dotenv from "dotenv"; //

dotenv.config(); // 

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
    ]
  }); console.log("Success! - validated bot token..."); // Logs the console

// Initilizing Client
client.on("ready", async () => await onReady(client)); console.log("Success! - bot is starting...");

// Creating Interaction
client.on("interactionCreate", async (interaction) => await onInteraction(interaction));

// Commands
client.slashCommands = new Collection<string, SlashCommand>()
client.commands = new Collection<string, Command>()
client.cooldowns = new Collection<string, number>()

// Awaiting Connections
await connectDatabase(); // Awaiting database connection

await client.login(process.env.TOKEN as string); // Awaiting client connection & login the bot using .env file bot Token.

} // Closes validateEnv();

) // Closes (async () => {

(); // Prints Missing Discord bot token error if no valid bot TOKEN is provided in the .env file.
