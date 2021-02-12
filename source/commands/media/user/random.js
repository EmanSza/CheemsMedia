const PREFIX = require('../../../../config/botconfig.json').PREFIX;
const { MessageEmbed } = require('discord.js')
const { getReply } = require('../../../utils/utils')
// Change DIR if needed

module.exports = {
    name: "random",
    description: "Get a random post",
    usage: `\`${PREFIX}random\``,

    execute: async function(client, message, args) {
        let posts = await client.DBPost.find({});
        let post = posts.random()

        // return console.log(post)
        const user = await client.users.fetch(post.author);

        const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(post.title)
        .setDescription(post.description)
        .setFooter(user.tag, user.displayAvatarURL({ dynamic: true }));

        if (post.image !== 'None') embed.setImage(post.image);

        message.channel.send(embed)

        let reply = await getReply(message, { time: 30000 })
        if (!reply) return;
        if (reply.content.toLowerCase() === '!up') {
            await client.DBPost.findByIdAndUpdate(post._id, { $inc: { upvotes: 1 } }, { new: true, upsert: true });
            await client.DBUser.findByIdAndUpdate(post.author, { $inc: { cheems: 1 } }, { new: true, upsert: true });
            message.reply('Cheems Given! 😊')
        }
        else if (reply.content.toLowerCase() === '!down') {
            await client.DBPost.findByIdAndUpdate(post._id, { $inc: { downvotes: 1 } }, { new: true, upsert: true });
            await client.DBUser.findByIdAndUpdate(post.author, { $inc: { cheems: -1 } }, { new: true, upsert: true });
            message.reply('Cheems Taken! 😢')
        }
    }
}