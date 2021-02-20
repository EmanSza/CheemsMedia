const PREFIX = require('../../../../../config/botconfig.json').PREFIX;
const { getReply } = require('../../../../utils/utils')
// Change DIR if needed

module.exports = {
    name: "downvote",
    aliases: [],
    description: "",
    usage: `\`${PREFIX}\``,
    examples: `\`${PREFIX}\``,
    perms: [],
    cooldown: 0,

    execute: async function(client, message, args) {
      message.channel.send('Give me a post id!')
        let postId = await getReply(message, { time: 30000} )
        if(!postId) return message.reply('We need the ID of a post!')

        let DBPost = await client.DBPost.findById(postId.content)
        if(!DBPost) return(`Could not Fetch a post with the id ${postId.content}`)

        
        let reply = await getReply(message, { time: 30000 })
        if (!reply) return;
          if(DBPost.cheemTakers.includes(message.author.id)) return message.reply('You have already taken Cheems to this post');
          if(DBPost.cheemGivers.includes(message.author.id)) { await client.DBPost.findByIdAndUpdate(DBPost._id, { $pull: { cheemGivers: message.author.id } }, { new: true, upsert: true}) };
            await client.DBPost.findByIdAndUpdate(postID, { $inc: { downvotes: 1 } }, { new: true, upsert: true });
            await client.DBUser.findByIdAndUpdate(DBPost.author, { $inc: { cheems: -1 } }, { new: true, upsert: true });
            await client.DBPost.findByIdAndUpdate(DBPost._id, { $push: { cheemTakers: message.author.id } }, { new: true, upsert: true});
            message.reply('Cheems Taken! 😢')
    }
}