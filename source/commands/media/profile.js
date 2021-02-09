const PREFIX = require('../../../config/botconfig.json').PREFIX;
const { MessageEmbed } = require('discord.js')
// Change DIR if needed

module.exports = {
  name: "profile",
  aliases: [],
  description: "",
  usage: `\`See your profile\``,
  examples: `\`${PREFIX}profile\``,
  perms: [],
  cooldown: 0,

  execute: async function (client, message, args) {
    let DBUser = await client.DBUser.findById(message.author.id);
    if (!DBUser) return message.reply('You must signup using the signup command!')

    let user = client.users.cache.get(args[0]);
    if (user) user = user.id
    if (!user) user = message.author.id
    //  if (user.id === message.author.id) return

    if (!DBUser) {
      const fetch = await client.DBUser.findById(message.author.id);
      // When testing when making the 1st argument into a ID got a id of null pushing into dev branch
      DBUser = {}
      DBUser['_id'] = fetch._id
      DBUser['cheems'] = fetch.cheems
      DBUser['posts'] = fetch.posts.length
      DBUser['followers'] = fetch.followers
      DBUser['follows'] = fetch.follows
    }
    const cheems = DBUser.cheems;
    const post = DBUser.post
    const postlength = DBUser.posts.length
    const followers = DBUser.followers
    const follows = DBUser.follows
    const Totalfollows = DBUser.follows.length


    const profile = new MessageEmbed()
      .setTitle(message.author.tag)
      .addFields(
        { name: "Total Posts:", value: postlength || 'None', inline: false },
        { name: "Total Cheems", value: cheems || '0', inline: true },
        { name: "Total Follows", value: Totalfollows || '0', inline: false },
        { name: "Total Followers", value: followers || 'None', inline: false },
       // { name: "Following", value: follows || 'None', inline: false },
      )
      .setThumbnail(message.author.displayAvatarURL())
    try {
      message.channel.send(profile)
    } catch (err) {
      console.log(err)
      message.reply(`Error!\nPlease Contact an Admin about this`)
    }
  }
}