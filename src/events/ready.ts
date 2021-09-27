// Importing the libraries
import bot from "../classes/bot";

// exporting the ready event
export default async function ready(client: bot) {
    const slashCommands = [], commands = client.commands.toJSON();

    // Getting the slash command data
    for (let i = 0; i < commands.length; i++) {
        const { name, description, options } = commands[i];

        // Type 1 means chat input command
        slashCommands.push({
            name, description, options, type: 1
        });
    }

    // Adding the slash commands globally
    if (slashCommands.length > 0) await client.application?.commands.set(slashCommands);

    console.log("Bot is up and running!");
}