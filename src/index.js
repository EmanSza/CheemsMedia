// --== Discord ==--
const Discord = require('discord.js');
const client = new Discord.Client(
    {
        disableEveryone: true,
        disabledEvents: ['TYPING_START']
    },
);

// --== Database ==--
const mongoose = require('mongoose');

// --== Config ==--
require('dotenv').config();

// --== Handler ==--
const handler = require('./utils/handler');
const handlers = new handler(client);

// Login to Discord & Connect to Database
(async () => {

    await client.login(process.env.TOKEN);
    // Database Connection
    const database = require('./database/database');
    // Connect to the Database
    await database.connect(mongoose);
    // Load Commands
    await handlers.loadCommandFiles('./src/commands');
    // Load the Events Files
    await handlers.loadEventFiles('./src/events');
})();
