const PREFIX = require('../../../config/botconfig.json').PREFIX;
const { getReply } = require('../../utils/utils')
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

        let follow = {
            follows: userID
        }

        let following = {
            following: message.author.id
        }

     await client.DBUser.findByIdAndUpdate(message.author.id, { $push: { follows: follow.follows} }, { new: true, upsert: true });
     await client.DBUser.findByIdAndUpdate(userID, {$push: { followers: following.following  }, new: true, upsert: true });
   try{
    message.reply(`Congrats! you followed ${userID}`)
   } catch(err) {
       message.reply(`Error! \n Please Contact an Admin about this`)
   }
    }
}