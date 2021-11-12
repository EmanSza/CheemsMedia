//Require Modules
const Discord = require('discord.js');
const mongoose = require('mongoose');

// Extra Modules that are not required
const chalk = require("chalk");

// File Requirements
const { TOKEN, MONGOURI } = require("../config/botconfig.json");
const { registerCommands, registerEvents } = require("./utils/registry");
const InitateTopGG = require('./utils/topgg')
// Require Schemas and Models
client.DBConfig = require('../config/schema/config');
client.DBUser = require('../config/schema/user.js');
client.DBPost = require('../config/schema/posts.js');
client.DBGuild = require('../config/schema/guild.js');
client.DBStaff = require('../config/schema/staff.js');
client.DBComments = require('../config/schema/comments.js');

// Client Statements
const client = new Discord.Client()

// Ready The Client & Set The Status
client.on('ready', () => {
    client.user.setPresence({ activity: {name: '!help', type: 'LISTENING'}})
}); { setTimeout(() => { console.log(chalk.red(`<CLIENT>`) + (' ') + chalk.blue(`Logged in`)); }, 1000 * 3)}


// Async Function
(async () => {
    // Set a blacklist lis to a JS Collection
    client.blacklistCache = new Set()
    // Pass client to function to send data to TOPGG
    InitateTopGG(client)
    // Connect to Discords API
    await client.login(TOKEN).then(console.log(chalk.red(`<CLIENT>`) + (' ') + chalk.blue('Starting up...')));
    // Create command Collection/Cache
    client.commands = new Discord.Collection();

    // Register Commands and Events
    await registerEvents(client, '../eventHandlers').then(log(chalk.magenta('<HANDLER>') + (' ') + chalk.blue(`Loaded Events`)));
    await registerCommands(client, '../commands').then(log(chalk.magenta('<HANDLER>') + (' ') + chalk.blue(`Loaded Commands`)));
    // Connect to MongoDB Database and set up the database.
    await mongoose.connect(MONGOURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });  { setTimeout(() => { console.log(chalk.cyan(`<DATABASE>`) + (' ') + chalk.blue(`Connected`)); }, 5) };

    //Blacklist
    const blacklistFetch = await client.DBConfig.findByIdAndUpdate('blacklist', {}, {new: true, upsert: true, setDefaultsOnInsert: true});
    client.blacklistCache = new Set(blacklistFetch.blacklisted);
    // Create Staff List
    const stafflist = await client.DBStaff.find({});
    if (stafflist) client.stafflist = stafflist;
    var admins = []
    var devs = []
    client.stafflist.forEach(function (s) {
      if (s.job == 'admin') admins.push(s._id)
      else if (s.job == 'developer') devs.push(s._id)
    })
    // Add Admins and Devs to cache
    client.admins = admins;
    client.devs = devs;
})();

