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
    }
}