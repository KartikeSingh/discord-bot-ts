// Importing the libraries
import bot from "../classes/bot";
import { CommandInteractionOption, Interaction } from "discord.js";

// exporting the event handler
export default function interactionCreate(client: bot, interaction: Interaction) {
    // Returning if interaction is not a command

    if (!interaction.isCommand()) return;

    const args: Array<CommandInteractionOption> = [];

    // Adding all the arguments
    interaction.options.data.forEach(v => args.push(v));

    // Searching for the command
    const command = client.commands.get(interaction.commandName);

    // Returning if the command is not found
    if (!command) return;

    // Running the command
    command.run(client, interaction, args);
}