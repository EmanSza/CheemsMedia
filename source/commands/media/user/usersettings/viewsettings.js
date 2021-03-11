const PREFIX = require('../../../../../config/botconfig.json').PREFIX;
const { MessageEmbed } = require('discord.js')
// Change DIR if needed

module.exports = {
  name: "viewsettings",
  aliases: ["vs"],
  description: "",
  usage: `\`See your profile\``,
  examples: `\`${PREFIX}profile\``,
  perms: [],
  cooldown: 10,
  disabled: false,

  execute: async function (client, message, args) {
    let DBAuthor = await client.DBUser.findById(message.author.id);
    if (!DBAuthor) return message.reply('Please sign up using the signup command')
    let user = message.author

    let DBUser = await client.DBUser.findById(user.id);
    if (!DBUser) return message.reply(`We Cannot find a user with the ID ${user.id}`)
    //Setting Values
    let dmOpted = 'True'
    let verified = 'True'
    //Bolean Statements
    if(!DBUser.dmOpt) dmOpted = 'False'
    if(!DBUser.verified) verified = "False"

    const profile = new MessageEmbed()
      .setTitle(`${user.username}'s Privacy Settings`)
      .addFields(
        { name: "Direct Messages", value: dmOpted || 'Unknown', inline: true },
        { name: "User Color", value: DBUser.color || 'Unknown', inline: true },
        { name: "Verified", value: verified || 'Unknown', inline: true },
        { name: "Premium", value: 'Not Released', inline: true }
      )
      .setColor(DBUser.color)
      .setThumbnail(user.displayAvatarURL())
    try {
      message.channel.send(profile)
    } catch (err) {
      console.log(err)
      message.reply(`Error!\nPlease Contact an Admin about this`)
    }
  }
}