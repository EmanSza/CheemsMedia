const PREFIX = require('../../../../../config/botconfig.json').PREFIX;
const { getReply } = require('../../../../utils/utils')
// Change DIR if needed

module.exports = {
    name: "unfollow",
    description: "unfollow Someone",
    usage: `\`${PREFIX}follow\``,
    cooldown: 0,

    execute: async function (client, message, args) {
        let user = client.users.cache.get(args[0]) || message.mentions.users.first();
        if (user.id === message.author.id) return message.reply('You cannot follow yourself');
        if (!user) return message.reply('You must give me a users ID!')
        const follower = await client.DBUser.findById(message.author.id)
        
        if(!follower.follows.includes(user.id)) return message.reply('This user is not followed!')

        let follow = { follows: user.id }
        let following = { following: message.author.id }

        await client.DBUser.findByIdAndUpdate(message.author.id, { $pull: { follows: follow.follows } }, { new: true, upsert: true });
        await client.DBUser.findByIdAndUpdate(user.id, { $pull: { followers: following.following }, new: true, upsert: true });
        try {
            await user.send(` ${message.author.tag} has unfollowed you!`)
            await message.reply(`Congrats! you unfollowed ${user.id}`)
        } catch (err) {
            message.reply(`Congrats! you unfollowed ${user.id} but I couldn't tell them`)
        }
    }
}