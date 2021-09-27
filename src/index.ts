// Importing the libraries
import bot from './classes/bot';

// Loading the environment variables
import 'dotenv/config';

// Declaring the discord client
const client = new bot({
    // Adding the intents.
    intents: ["GUILDS"]
});

// Logging in the client
client.login(process.env.TOKEN);