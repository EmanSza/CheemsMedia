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

    execute: async function(client, message, args) {

      let user = client.users.cache.get(args[0]);
        if(user) user = user.id
        if(!user) user = message.author.id 
      //  if (user.id === message.author.id) return

        let DBUser = await client.DBUser.findById(message.author.id);
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
    const postlength = DBUser.posts.length
    const followers = DBUser.followers
    const follows = DBUser.follows
    const Totalfollows = DBUser.follows.length


    const profile = new MessageEmbed()
    .setTitle(message.author.tag)
    .addFields(
        {name: "Total Posts:", value: postlength, inline: false },
        {name: "Total Cheems", value: cheems, inline: true },
        // Didnt have time to update the DB to get defaults
       // {name: "Total Followers", value: followers, inline: false },
       // {name: "Total Follows", value: Totalfollows, inline: false },
       // {name: "Following", value: follows, inline: false }
    )
    .setThumbnail(message.author.displayAvatarURL())
    message.channel.send(profile)
    }
}