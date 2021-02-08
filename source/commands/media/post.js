const PREFIX = require('../../../config/botconfig.json').PREFIX;
const { getReply } = require('../../utils/utils')
// Change DIR if needed

module.exports = {
    name: "post",
    description: "",
    usage: `\`${PREFIX}post\``,
    cooldown: 0,

    execute: async function(client, message, args) {
        message.channel.send(`${message.author.tag}, what should be the title of the post?`);

        let title = await getReply(message, { time: 60000 });
        if (!title) return message.channel.send(`${message.author.tag}, times up! Try again.`);

        message.channel.send(`${message.author.tag}, what should be the description of the post?`);
        let description = await getReply(message, { time: 120000 });
        if (!description) return message.channel.send(`${message.author.tag}, times up! Try again.`);

        message.channel.send(`${message.author.tag}, do you want to add an image?`);
        let image = await getReply(message, { time: 60000, type: 'image' });
        if (!image) image = 'None';

        let post = {
            _id: message.id,
            author: message.author.id,
            title: title.content,
            description: description.content,
            image: image.content
        }

        await client.DBUser.findByIdAndUpdate(message.author.id, { $push: { posts: post._id } }, { new: true, upsert: true });
        await client.DBPost.findByIdAndUpdate(message.id, { $set: post }, { new: true, upsert: true })

        message.reply(` Good job Cheems!! your post has been uploaded! `)
    }
}