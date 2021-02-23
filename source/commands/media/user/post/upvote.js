const PREFIX = require('../../../../../config/botconfig.json').PREFIX;
const { getReply } = require('../../../../utils/utils')
// Change DIR if needed

module.exports = {
    name: "upvote",
    aliases: [],
    description: "",
    usage: `\`${PREFIX}\``,
    examples: `\`${PREFIX}\``,
    perms: [],
    cooldown: 5,

    execute: async function(client, message, args) {
      let postID = args[0];
      if (!postID) {
      await message.channel.send('Please send me the ID');
      const reply = await getReply(message, { time: 30000});
      if (reply && reply.content) postID = reply.content;
      else return message.channel.send('I need a valid ID')
      }

        let DBPost = await client.DBPost.findById(postID.content)
        if(!DBPost) return(`Could not Fetch a post with the id ${postID.content}`)

          if(DBPost.cheemGivers.includes(message.author.id)) return message.reply('You have already taken Cheems to this post');
          if(DBPost.cheemTakers.includes(message.author.id)) { await client.DBPost.findByIdAndUpdate(DBPost._id, { $pull: { cheemTakers: message.author.id } }, { new: true, upsert: true}); } 
            await client.DBPost.findByIdAndUpdate(DBPost._id, { $inc: { upvotes: 1 } }, { new: true, upsert: true });
            await client.DBUser.findByIdAndUpdate(DBPost.author, { $inc: { cheems: 1 } }, { new: true, upsert: true });
            await client.DBPost.findByIdAndUpdate(DBPost._id, { $push: { cheemTakers: message.author.id } }, { new: true, upsert: true});
            message.reply('Cheems Taken! 😢')
    }
}
