const PREFIX = require('../../../../config/botconfig.json').PREFIX;
const { getReply } = require('../../../utils/utils')
// Change DIR if needed

module.exports = {
    name: "follow",
    description: "Follow Someone",
    usage: `\`${PREFIX}follow\``,
    cooldown: 0,

    execute: async function(client, message, args) {
        let userID = client.users.cache.get(args[0]);
        if(userID) userID = userID.id
        if(!userID) return message.reply('You must give me a users ID!')
        


<<<<<<< Updated upstream:source/commands/media/follow.js
        let user = {
            _id: message.author.id,
            follows: userID
        }

        await client.DBUser.findByIdAndUpdate(message.author.id, { $push: { user: user.follows} }, { new: true, upsert: true });
   try{
    message.reply(`Congrats! you followed ${userID}`)
   } catch(err) {
       message.reply(`Error! \n Please Contact an Admin about this`)
   }
=======
        let followinfo = {
            follows: user.id,
            following: message.author.id
        }
        const result = await client.DBUser.findById(message.author.id)
        if (result.follows.includes(user.id)) return message.channel.send('You are already following this user')


        await client.DBUser.findByIdAndUpdate(message.author.id, { $push: { follows: followinfo.follows } }, { new: true, upsert: true });
        await client.DBUser.findByIdAndUpdate(user.id, { $push: { followers: followinfo.following }, new: true, upsert: true });
        try {
            await user.send(`${message.author.tag} has Followed you!`)
            await message.reply(`Congrats! you followed ${user.tag}`)
        } catch (err) {
            message.reply(`Congrats! you followed ${user.tag} however I couldn't tell them`)
        }
>>>>>>> Stashed changes:source/commands/media/user/follow.js
    }
}