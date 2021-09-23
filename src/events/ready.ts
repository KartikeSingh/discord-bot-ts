// Importing the libraries
import axios from "axios";
import bot from "../classes/bot";
import * as commands from '../commands';

// exporting the ready event
export const ready = (client: bot, ...useless: Array<any>) => {
    const slashCommands = [];

    for (let i = 0; i < Object.keys(commands).length; i++) {
        const command = Object.values(commands)[i].default;

        client.commands.set(command.name, command);

        if (command.slash) slashCommands.push({
            name: command.name,
            description: command.description,
            type: 1,
            options: command?.options
        });
    }

    slashCommands.forEach(v => {
        // @ts-ignore: Object is possibly 'null'.
        axios.post(`https://discord.com/api/v9/applications/${client.user.id}/commands`, v, {
            headers: {
                Authorization: `Bot ${client.token}`
            }
        }).catch(e => {
            console.log("Error in creating slash commands.");
            console.log(e.response.data.errors._errors);
        })
    });

    console.log("Bot is up and running!");
}