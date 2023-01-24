import {Client, GatewayIntentBits, Partials} from "discord.js";

// Client Intents
const { 
        Guilds,
        MessageContent,
        GuildMessages,
        GuildMessageReactions,
        GuildMessageTyping,
        DirectMessages,
        DirectMessageReactions,
        DirectMessageTyping,
        GuildMembers
} = GatewayIntentBits

export const client = new Client({
    intents:[
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
        Partials.Channel, // Required to receive DMs
      ],
});