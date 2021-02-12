const PREFIX = require('../../../../../config/botconfig.json').PREFIX;
const { getReply, DMfeed, ChannelFeed } = require('../../../../utils/utils')
const {MessageEmbed} = require('discord.js')
// Change DIR if needed

module.exports = {
    name: "post",
    description: "",
    usage: `\`${PREFIX}post\``,
    cooldown: 0,

    execute: async function(client, message, args) {
        let DBUser = await client.DBUser.findById(message.author.id);
        if (!DBUser) return message.reply('You must signup using the signup command!');
       
        message.channel.send(`${message.author.tag}, what should be the title of the post?`);

        let title = await getReply(message, { time: 60000 });
        if (!title) return message.channel.send(`${message.author.tag}, times up! Try again.`);

        message.channel.send(`${message.author.tag}, what should be the description of the post?`);
        let description = await getReply(message, { time: 120000 });
        if (!description) return message.channel.send(`${message.author.tag}, times up! Try again.`);

        message.channel.send(`${message.author.tag}, do you want to add an image?`);
        let image = await getReply(message, { time: 60000, type: 'image' });
        if(image.attachments.size > 0)  image = image.attachments.first().url
        else if(!image.content.toLowerCase().includes('none') && !image.content.toLowerCase().includes('https://')) return message.reply('You message does not include none or a image link!') 
        
        let post = {
            _id: message.id,
            author: message.author.id,
            title: title.content,
            description: description.content,
            image: image.content || image
        }

        await client.DBUser.findByIdAndUpdate(message.author.id, { $push: { posts: post._id } }, { new: true, upsert: true });
        await client.DBPost.findByIdAndUpdate(message.id, { $set: post }, { new: true, upsert: true })
        try {
        message.reply(` Good job Cheems!! your post has been uploaded! `)
        } catch(err) {
            console.log(err)
            message.reply(`Error!\nPlease Contact an Admin about this`)
        }
      /*  const feedEmbed = new MessageEmbed() 
        .setAuthor(message.author.tag)
        .setTitle(title)
        .setDescription(description)
        .setColor("RANDOM")
        if(post.image != 'none') feedEmbed.setImage(image)
        // This will DM a Follower if the User Posted a message!
        const follower = await client.DBUser.findById(message.author.id)
        for(const followers of follower.followers){
            client.users.cache.get(followers).send(`**${message.author.tag}** Made a new post!`)
            const embed = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
            .setTitle(title)
            .setColor("RANDOM")
            .setFooter(client.users.cache.get(followers).tag, client.users.cache.get(followers).displayAvatarURL({dynamic: true}))
            .setDescription(description)
            if(image !== 'none') embed.setImage(`${image}`)
            client.users.cache.get(followers).send(embed)
        }
        //this will send a message to feed channels
        for(const guild of client.guilds.cache){
            
            const guildId = guild[0]
            const guildData = await client.DBGuild.findById(guildId)
            if(!guildData) return
            const channel = client.channels.cache.get(guildData.feedChannel)
            if(guildData.followedPosters.includes(message.author.id)) return channel.send(feedEmbed) 
            
        } */
    }
}