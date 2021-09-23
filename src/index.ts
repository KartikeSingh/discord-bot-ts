// Importing the libraries
import { Intents } from 'discord.js';
import * as events from './events';
import { config } from 'dotenv';
import bot from './classes/bot';

// Loading the enviroment variables
config();

// Declaring the discord client
const client = new bot({
    // Adding the intents.
    intents: new Intents().add("GUILDS", "GUILD_MESSAGES")
});

// Handling all the events listed in /events folder
Object.keys(events).forEach((v, i) => {
    client.on(v, (a, b, c, d) => Object.values(events)[i](client, a, b, c, d));
})

// Logging in the client
client.login(process.env.TOKEN);