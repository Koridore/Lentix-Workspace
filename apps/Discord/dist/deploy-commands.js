"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regCMD = void 0;
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const node_path_1 = tslib_1.__importDefault(require("node:path"));
const rest_1 = require("@discordjs/rest");
const v9_1 = require("discord-api-types/v9");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
const regCMD = (clientId) => {
    const commands = [];
    const cmdPath = node_path_1.default.join(__dirname, "commands");
    const cmdFiles = fs_1.default
        .readdirSync(cmdPath)
        .filter((file) => file.endsWith(".js"));
    const rest = new rest_1.REST({ version: "9" }).setToken(process.env.TOKEN);
    for (const file of cmdFiles) {
        const filePath = node_path_1.default.join(cmdPath, file);
        const command = require(filePath);
        commands.push(command.data.toJSON());
    }
    rest
        .put(v9_1.Routes.applicationCommands(clientId), { body: commands })
        .then(() => console.log(`Successfully registered ${commands.length} application commands.`))
        .catch(console.error);
};
exports.regCMD = regCMD;
