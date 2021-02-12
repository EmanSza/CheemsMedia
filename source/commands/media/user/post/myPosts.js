const PREFIX = require('../../../../../config/botconfig.json').PREFIX;
const { MessageEmbed } = require('discord.js')
// Change DIR if needed

module.exports = {
    name: "posts",
    aliases: ["ps"],
    description: "Look at a users post!",
    usage: `\`${PREFIX}\``,
    examples: `\`${PREFIX}\``,
    perms: [],
    cooldown: 0,

    execute: async function (client, message, args) {
        let user = client.users.cache.get(args[0]) || message.mentions.users.first();
        if (!user) user = message.author;

        // Look for User in the database
        let DBUser = await client.DBUser.findById(user.id);
        if (!DBUser) return message.reply('Please use the Signup command!')
        if (!DBUser) {
            const fetch = await client.DBUser.findById(user.id);
            DBUser = {}
            DBUser['_id'] = fetch._id
            DBUser['posts'] = fetch.posts
        }

        let UserInfo = { id: DBUser._id, postarray: DBUser.posts }

        let DBPost = await client.DBPost.findById(UserInfo.postarray)
        if (!DBPost) {
            const fetch = await client.DBPost.findById(UserInfo.postarray);
            DBPost = {}
            DBPost['id'] = fetch._id
            DBPost['title'] = fetch.title
        }
        let postInfo = { id: DBPost._id, postitle: DBPost.title}
       
            let hEmbed = new MessageEmbed()
                .setTitle(`${user.tag} List of Posts!`)
                .setColor("RANDOM")
                .setTimestamp()
           postInfo.id.forEach(element => {
               hEmbed.addField(postInfo.postitle, postInfo.id)
           });
           message.channel.send(hEmbed)
    }
}