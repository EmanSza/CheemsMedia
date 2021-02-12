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

        let posts = await client.DBPost.find({author: user.id})
       // console.log(posts)
            let hEmbed = new MessageEmbed()
                .setTitle(`${user.tag} List of Posts!`)
                .setColor("RANDOM")
                .setTimestamp()
            for(const postinfo of posts){
                hEmbed.addField(postinfo.title, postinfo._id)
            }
           message.channel.send(hEmbed)
    }
}