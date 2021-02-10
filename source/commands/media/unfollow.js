const PREFIX = require('../../../config/botconfig.json').PREFIX;
const { getReply } = require('../../utils/utils')
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

        let follow = { follows: user.id }
        let following = { following: message.author.id }

        await client.DBUser.findByIdAndUpdate(message.author.id, { $pull: { follows: follow.follows } }, { new: true, upsert: true });
        await client.DBUser.findByIdAndUpdate(user.id, { $pull: { followers: following.following }, new: true, upsert: true });
        try {
            message.reply(`Congrats! you followed ${user.id}`)
            user.send(` ${message.author.tag} has unfollowed you!`)
        } catch (err) {
            message.reply(`Error! \n Please Contact an Admin about this`)
        }
    }
}