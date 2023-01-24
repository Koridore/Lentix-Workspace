import { client } from "../src/clientIntents";

import { readdirSync } from "fs";
import { join } from "path";

//Redirects
export const handlersDir = join(__dirname, "./handlers")
readdirSync(handlersDir).forEach(handler => {
    require(`${handlersDir}/${handler}`)(client)
}); console.log(client);