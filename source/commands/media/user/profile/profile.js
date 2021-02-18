const PREFIX = require('../../../../../config/botconfig.json').PREFIX;
const { MessageEmbed } = require('discord.js')
// Change DIR if needed

module.exports = {
  name: "profile",
  aliases: ["profil"],
  description: "",
  usage: `\`See your profile\``,
  examples: `\`${PREFIX}profile\``,
  perms: [],
  cooldown: 0,

  execute: async function (client, message, args) {
    let user = client.users.cache.get(args[0]) || message.mentions.users.first();
    if (!user) user = message.author

    let DBUser = await client.DBUser.findById(user.id);
    if (!DBUser) return message.reply('Please sign up using the signup command\nif you are signed up if your mentioning someone they have not Opted in!')

    const profile = new MessageEmbed()
      .setTitle(user.tag)
      .addFields(
        { name: "Profile Bio", value: DBUser.bio || 'No Bio', inline: false },
        { name: "Total Posts:", value: DBUser.posts.length || 'None', inline: true },
        { name: "Total Cheems", value: DBUser.cheems || '0', inline: true },
        { name: "Total Follows", value: DBUser.follows.length || '0', inline: true },
        { name: "Total Followers", value: DBUser.followers.length || 'None', inline: true },
        { name: "Verifed:", value: DBUser.verified || 'false', inline: true },
        { name: "Join Date", value: DBUser.joindate || 'Never Joined', inline: false },
      )
      .setColor(ProfileColor)
      .setThumbnail(user.displayAvatarURL())
    try {
      message.channel.send(profile)
    } catch (err) {
      console.log(err)
      message.reply(`Error!\nPlease Contact an Admin about this`)
    }
  }
}