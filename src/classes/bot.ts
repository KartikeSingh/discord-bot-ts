import { ApplicationCommandOption, Client, ClientOptions } from "discord.js";
import { Collection } from 'discord.js';
import { promises, readdirSync } from 'fs';
import { join } from 'path';

class bot extends Client {
    // Defining the custom properties
    commands: Collection<string, Command> = new Collection();
    categoires: Array<string> = readdirSync(join(__dirname, '../commands'));

    extension: string = "ts";

    // array of owner's Discord IDs
    // Make sure to at least remove my ID from the array ( it is just a placeholder ) 
    owners: string[] = ["441943765855240192"];

    constructor(options: ClientOptions) {
        super(options);

        // Changing the properties according to the NODE_ENV mode
        if (join(__dirname, '../commands').includes("build\\")) {
            this.extension = "js";
        }

        this.setCommands();
        this.handleEvents();
    }

    async setCommands() {
        const categories = await promises.readdir(join(__dirname, `../commands`));

        categories.forEach(async cat => {
            // Reading the  directories which are inside command directory
            const commands = (await promises.readdir(join(__dirname, `../commands/${cat}`))).filter(file => file.endsWith(this.extension));

            for (let i = 0; i < commands.length; i++) {
                const file = commands[i];

                // Getting the command
                const command: Command = require(`../commands/${cat}/${file}`)?.default || {};

                // Throwing the error if the file do not have a command
                if (!command.name || typeof (command.run) !== "function") throw new SyntaxError("A command should have `data` property and a `execute` method");

                // Setting the command
                this.commands.set(command.name, command);
            }
        })
    }

    async handleEvents() {
        // Getting all the events listed in "/events" folder
        const events = await promises.readdir(join(__dirname, `../events`));

        for (let i = 0; i < events.length; i++) {

            const event = require(`../events/${events[i]}`)?.default || {};

            if (!event || typeof (event) !== "function") return; // Not a valid event file

            this.on(events[i].split(".")[0], (...args) => event(this, ...args))
        }
    }
}

export default bot;

interface Command {
    name: string,
    description: string,
    category: string,
    slash: boolean,
    args?: string,
    aliases?: Array<string>,
    timeout?: number,
    options: ApplicationCommandOption[],
    run: Function
}