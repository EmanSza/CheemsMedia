//Require Modules
const Discord = require('discord.js');
const path = require('path');

const chalk = require("chalk")
const log = console.log

//File Requirements
const { TOKEN } = require(path.join(__dirname, "../config/botconfig.json"));
const { registerCommands, registerEvents } = require(path.join(__dirname, "./utils/registry"))

// Client Statements
const client = new Discord.Client()

client.on('ready', () => {
    log(chalk.red(` <Loners Bot>`) + chalk.blue(`Logged in`))
    client.user.setPresence({ activity: {name: '!help', type: 'LISTENING'}})
});



(async () => {
    await client.login(TOKEN);
    console.log('Bot is Starting Up!')
    client.commands = new Discord.Collection();
    await registerEvents(client, '../eventHandlers');
    await registerCommands(client, '../commands');
})();