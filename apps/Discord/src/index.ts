import {
    Client,
    ClientOptions,
    GatewayIntentBits,
    Collection,
    PermissionFlagsBits,
    ClientApplication,
    InteractionType,
    Interaction,
    CommandInteraction,
    Partials,
    ButtonInteraction,
    ModalSubmitInteraction,
    SelectMenuInteraction,
  } from "discord.js";

const { 
    Guilds, 
    MessageContent, 
    GuildMessages, 
    GuildMembers 
} = GatewayIntentBits

const client = new Client({
    intents:[
        Guilds, 
        MessageContent, 
        GuildMessages, 
        GuildMembers
    ]
})

const token = "bot-token-here"; // add your token here

console.log("Bot is starting...");

import { Command, SlashCommand } from "../../Discord/src/types";

// import { validator } from "envalid";
import { config } from "dotenv";
import { readdirSync } from "fs";
import { join } from "path";

config()

client.slashCommands = new Collection<string, SlashCommand>()
client.commands = new Collection<string, Command>()
client.cooldowns = new Collection<string, number>()

const handlersDir = join(__dirname, "./handlers")
readdirSync(handlersDir).forEach(handler => {
    require(`${handlersDir}/${handler}`)(client)
})

console.log(client);

client.login(process.env.TOKEN)