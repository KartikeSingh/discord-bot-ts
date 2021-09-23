// Importing the libraries
import { CommandInteraction, CommandInteractionOption, Message } from "discord.js";
import bot from "../../classes/bot";

// Exporting the command
export default {
    // The name of the command
    name: "ping",

    // The category of the command
    category: "general",

    // The desription of the command
    description: "Get the ping of the bot",

    // Whether the command is slash command or not
    slash: true,

    // The options for slash commands
    options: [],

    // The main method
    run: async (client: bot, message: Message | CommandInteraction, args: Array<String | CommandInteractionOption>) => {
        message.reply({ content: `Pong is ${client.ws.ping}` });
    }
}