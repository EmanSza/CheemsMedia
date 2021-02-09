const PREFIX = require('../../../config/botconfig.json').PREFIX;
const { MessageEmbed } = require('discord.js')
const { getReply } = require('../../utils/utils')
// Change DIR if needed

module.exports = {
    name: "random",
    description: "Get a random post",
    usage: `\`${PREFIX}random\``,

    execute: async function (client, message, args) {
        let DBUser = await client.DBUser.findById(message.author.id);

        let posts = await client.DBPost.find({});
        let post = posts.random()
        if(!post) return message.channel.send("There are no posts on this guild :thinking:")
        // return console.log(post)
        const user = await client.users.fetch(post.author);

        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(post.title)
            .setDescription(post.description)
            .setFooter(user.tag, user.displayAvatarURL({ dynamic: true }));

        if (post.image !== 'none') embed.setImage(post.image);

        message.channel.send(embed)

        let reply = await getReply(message, { time: 30000 })
        if (!reply) return;
        if (reply.content.toLowerCase() === '!up') {
            if (!DBUser) return message.reply('In order to cheems you must signup!');
            await client.DBPost.findByIdAndUpdate(post._id, { $inc: { upvotes: 1 } }, { new: true, upsert: true });
            await client.DBUser.findByIdAndUpdate(post.author, { $inc: { cheems: 1 } }, { new: true, upsert: true });
            message.reply('Cheems Given! 😊')
        }
        else if (reply.content.toLowerCase() === '!down') {
            if (!DBUser) return message.reply('In order to cheems you must signup');
            await client.DBPost.findByIdAndUpdate(post._id, { $inc: { downvotes: 1 } }, { new: true, upsert: true });
            await client.DBUser.findByIdAndUpdate(post.author, { $inc: { cheems: -1 } }, { new: true, upsert: true });
            message.reply('Cheems Taken! 😢')
        }
    }
}
