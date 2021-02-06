const Discord = require("discord.js");
const { PREFIX, BOTADMINS} = require('../../../config/botconfig.json');
const { blacklist, whitelist } = require('../../utils/utils')

const client = new Discord.Client({disableEveryone: true});
// inside the async execute

module.exports = {
    name: "whitelist",
    description: "",
    usage: "",
    examples: "",
    cooldown: 0,
    canNotDisable: false,
    
    execute: async function(client, message, args) {
        if (!BOTADMINS.includes(message.author.id)) return; 

         const user = message.mentions.users.first()
         if(!user) return message.reply('You didn\'t mention anyone!');

         try {
        whitelist(client, message.mentions.users.first().id)
         } catch(err) {
            console.log(chalk.red(`<${client.user.tag}>`) + (' ') + chalk.blue(` Whitelisted ${user}`))
         }
    }
}