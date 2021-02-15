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

    //  if (user.id === message.author.id) return

    if (!DBUser) {
      const fetch = await client.DBUser.findById(user.id);
      // When testing when making the 1st argument into a ID got a id of null pushing into dev branch
      DBUser = {}
      DBUser['_id'] = fetch._id
      DBUser['cheems'] = fetch.cheems
      DBUser['posts'] = fetch.posts.length
      DBUser['followers'] = fetch.followers
      DBUser['follows'] = fetch.follows
      DBUser['joindate'] = fetch.joindate
      DBUser['color'] = fetch.color
      DBUser['bio'] = fetch.bio
    }
    const cheems = DBUser.cheems;
    const post = DBUser.post
    const postlength = DBUser.posts.length
    const followers = DBUser.followers.length
    const follows = DBUser.follows
    const Totalfollows = DBUser.follows.length
    const JoinDate = DBUser.joindate
    const ProfileColor = DBUser.color
    const ProfileBio = DBUser.bio


    const profile = new MessageEmbed()
      .setTitle(user.tag)
      .addFields(
        { name: "Profile Bio", value: ProfileBio || 'No Bio', inline: false },
        { name: "Total Posts:", value: postlength || 'None', inline: true },
        { name: "Total Cheems", value: cheems || '0', inline: true },
        { name: "Total Follows", value: Totalfollows || '0', inline: true },
        { name: "Total Followers", value: followers || 'None', inline: true },
        { name: "Join Date", value: JoinDate || 'Never Joined', inline: false },
        // { name: "Following", value: follows || 'None', inline: false },
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