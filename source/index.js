//Require Modules
const Discord = require('discord.js');
const mongoose = require('mongoose');
const path = require('path');

const chalk = require("chalk");
const log = console.log;

//File Requirements
const { TOKEN, MONGOURI, TOPGGTOKEN } = require(path.join(__dirname, "../config/botconfig.json"));
const { registerCommands, registerEvents } = require(path.join(__dirname, "./utils/registry"))
const InitateTopGG = require('./utils/topgg')
// Client Statements
const client = new Discord.Client()

//Cient Ready Statement
client.on('ready', () => {
    log(chalk.red(`<${client.user.tag}>`) + (' ') + chalk.blue(`Logged in! ${client.guilds.cache.size}`))
    client.user.setPresence({ activity: {name: '!help', type: 'LISTENING'}})
});


// Async Fucktion 
(async () => {
    client.blacklistCache = new Set()
    InitateTopGG(client)
    await client.login(TOKEN);
    console.log(chalk.red(`<${client.user.tag}>`) + (' ') + chalk.blue('Starting up...'))
    client.commands = new Discord.Collection();
    await registerEvents(client, '../eventHandlers');
    await registerCommands(client, '../commands');
    //Schemas
    client.DBConfig = require('../config/schema/config')
    await mongoose.connect(MONGOURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });

    client.DBUser = require('../config/schema/user.js');
    client.DBPost = require('../config/schema/posts.js');
    client.DBGuild = require('../config/schema/guild.js')
    //Blacklist
    const blacklistFetch = await client.DBConfig.findByIdAndUpdate('blacklist', {}, {new: true, upsert: true, setDefaultsOnInsert: true})
    client.blacklistCache = new Set(blacklistFetch.blacklisted)
})();

Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
}