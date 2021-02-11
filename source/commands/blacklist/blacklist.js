const Discord = require("discord.js");
const { PREFIX, BOTADMINS, } = require('../../../config/botconfig.json');
const { blacklist } = require('../../utils/utils')

// inside the async execute

module.exports = {
    name: "blacklist",
    description: "",
    usage: "",
    examples: "",
    cooldown: 0,
    canNotDisable: false,
    
    execute: async function(client, message, args) {
        if (!BOTADMINS.includes(message.author.id)) return; 

         const user = message.mentions.users.first()
         if(!user) return message.reply('You didn\'t mention anyone!');

         try{
        blacklist(client, message.mentions.users.first().id)
        console.log(chalk.red(`<${client.user.tag}>`) + (' ') + chalk.blue(`Blacklisted ${user.tag}`))
         } catch(err) {
             console.log(err)
         }
    }
}