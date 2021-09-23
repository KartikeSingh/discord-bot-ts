// Importing the libraries
import bot from "../classes/bot";
import { Message } from "discord.js";

// exporting the event handler
export const messageCreate = (client: bot, message: Message, ...useless: Array<any>) => {
    // Returning if user is a bot / message wasn't a guild message or not started with the prefix
    if (message.author.bot || !message.guild || !message.content.startsWith("!")) return;

    // Getting the arguments
    const args = message.content.slice(1).split(" ");

    // Getting the command
    const command = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.commandAliases.get(args[0].toLowerCase()) || "");

    // Returning if command is not found
    if (!command) return;

    // Removing command name from argument list
    args.shift();

    // Running the command
    command.run(client, message, args);
}