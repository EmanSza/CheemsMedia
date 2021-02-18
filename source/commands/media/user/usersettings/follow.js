const PREFIX = require('../../../../../config/botconfig.json').PREFIX;
const { getReply } = require('../../../../utils/utils')
// Change DIR if needed

module.exports = {
    name: "follow",
    description: "Follow Someone",
    usage: `\`${PREFIX}follow\``,
    cooldown: 0,

    execute: async function (client, message, args) {
        let DBUser = await client.DBUser.findById(message.author.id);
        if (!DBUser) return message.reply('You must signup using the signup command!')

        let user = client.users.cache.get(args[0]) || message.mentions.users.first();
        if (user.id === message.author.id) return message.reply('You cannot follow yourself');
        if (!user) return message.reply('You must give me a users ID!')
        
        const result = await client.DBUser.findById(message.author.id)
        if (result.follows.includes(user.id)) return message.channel.send('You are already following this user')

        await client.DBUser.findByIdAndUpdate(message.author.id, { $push: { follows: user.id } }, { new: true, upsert: true });
        await client.DBUser.findByIdAndUpdate(user.id, { $push: { followers: message.author.id }, new: true, upsert: true });
        try {
            await user.send(`${message.author.tag} has Followed you!`)
            await message.reply(`Congrats! you followed ${user.tag}`)
        } catch (err) {
            message.reply(`Congrats! you followed ${user.tag} however I couldn't tell them`)
        }
    }
}