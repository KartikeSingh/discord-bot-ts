import { Client, ClientOptions, CommandInteraction, Message } from "discord.js";
import { Collection } from 'discord.js';

class bot extends Client {
    // Defining the custom properties
    commands: Collection<string, command>;
    categoires: Array<String>;
    commandAliases: Collection<string, string>;

    constructor(options: ClientOptions) {
        super(options);

        this.commands = new Collection();
        this.categoires = ["general"];
        this.commandAliases = new Collection();
    }
}

export default bot;

interface command {
    name: string,
    description: string,
    category: string,
    slash: boolean,
    args?: string,
    aliases?: Array<string>,
    timeout?: number,
    run: Function
}