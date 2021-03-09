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
  cooldown: 20,
  disabled: true,

  execute: async function (client, message, args) {
    let DBAuthor = await client.DBUser.findById(message.author.id);
    if (!DBAuthor) return message.reply('Please sign up using the signup command')
    let user = message.author

    let DBUser = await client.DBUser.findById(user.id);
    if (!DBUser) return message.reply(`We Cannot find a user with the ID ${user.id}`)
    if(DBUser.dmOpt == false) let dmOpted = 'Closed'
    const profile = new MessageEmbed()
      .setTitle(user.tag + 'Settings')
      .addFields(
        { name: "Direct Messages", value: dmOpted || 'Open', inline: false },
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