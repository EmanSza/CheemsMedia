const Discord = require("discord.js");
const { PREFIX, BOTADMINS } = require('../../../../config/botconfig.json');


const client = new Discord.Client({
    disableEveryone: true
});
// inside the async execute

module.exports = {
    name: "removestaff",
    description: "",
    usage: "",
    examples: "",
    cooldown: 0,
    //someServersOnly: false,

    execute: async function(client, message, args) {
      try {
          if(!message.mentions.users.first()) return message.reply('You need to mention user to remove')
          await client.DBStaff.findByIdAndDelete({ _id: message.mentions.users.first().id });
            message.reply(`Staff <@${message.mentions.users.first().id}> has been removed!`)
            client.stafflist = await client.DBStaff.find({})
        } catch(err) {
          message.reply(`Error!\nPlease Contact an Admin about this`)
        }
    }
}
