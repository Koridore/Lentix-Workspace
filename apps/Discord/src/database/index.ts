import * as CamperBD from "../../../Discord/src/database/CamperBD/index";

const mongoose = require('mongoose')
require('dotenv').config()


module.exports = {
    name: 'ready',
    once: true,

    async execute(client, commands) {
        console.log(`Ready! Logged in as ${client.user.tag}`);

        main().catch(err => console.log(err));

        console.log("Database Connected!");

    },
};


async function main() {
    await mongoose.connect(process.env.MONGO_URI);
}