<<<<<<< Updated upstream:source/commands/media/post.js
const PREFIX = require('../../../config/botconfig.json').PREFIX;
const { getReply } = require('../../utils/utils')
=======
const PREFIX = require('../../../../../config/botconfig.json').PREFIX;
const { getReply, DMfeed, ChannelFeed } = require('../../../../utils/utils')
const {MessageEmbed} = require('discord.js')
>>>>>>> Stashed changes:source/commands/media/user/post/post.js
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
<<<<<<< Updated upstream:source/commands/media/post.js

        message.reply(`, Good job Cheems!! your post has been uploaded! `)
=======
        try {
        message.reply(` Good job Cheems!! your post has been uploaded! `)
        } catch(err) {
            console.log(err)
            message.reply(`Error!\nPlease Contact an Admin about this`)
        }
    /*    const embed = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
            .setTitle(title)
            .setColor("RANDOM")
            
            .setDescription(description)
            if(post.image != 'none') embed.setImage(`${image}`)
            
        const feedEmbed = new MessageEmbed()
        .setAuthor(message.author.tag)
        .setTitle(title)
        .setDescription(description)
        .setColor("RANDOM")
        if(post.image != 'none') feedEmbed.setImage(`${image}`)
        // This will DM a Follower if the User Posted a message!
        DMfeed(message.author.id, message.author.tag, embed, message.client)
        //this will send a message to feed channels
        ChannelFeed(message.author.id, message.client, feedEmbed) */
>>>>>>> Stashed changes:source/commands/media/user/post/post.js
    }
}