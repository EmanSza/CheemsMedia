// --== Discord ==--
const Discord = require('discord.js');
const client = new Discord.Client();

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
    await mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });

    // Load Commands
    await handlers.loadCommandFiles('./src/commands');
    // Load the Events Files
    await handlers.loadEventFiles('./src/events');
})();
