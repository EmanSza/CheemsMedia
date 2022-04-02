// --== Discord ==--
const Discord = require('discord.js');
const client = new Discord.Client();

// --== Database ==--
const mongoose = require('mongoose');

// --== Config ==--
require('dotenv').config();

// --== Handler ==--
// Require the handler

const handler = require('./utils/handler');
const handlers = new handler(client);
(async () => {
    await client.login(process.env.TOKEN);
    await mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
})();
