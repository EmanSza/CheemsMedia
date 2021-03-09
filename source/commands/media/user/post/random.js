const PREFIX = require('../../../../../config/botconfig.json').PREFIX;
const { MessageEmbed } = require('discord.js')
const { getReply } = require('../../../../utils/utils')
// Change DIR if needed

module.exports = {
    name: "random",
    description: "Get a random post",
    usage: `\`${PREFIX}random\``,
    cooldown: 5,

    execute: async function(client, message, args) {
        let posts = await client.DBPost.find({});
        let post = nsfwPost(message.channel, posts)
        if(post.checked != true) await client.DBPost.find({});

        // return console.log(post)
        const user = await client.users.fetch(post.author);

        const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(post.title)
        .setDescription(post.description)
        .setFooter(user.tag, user.displayAvatarURL({ dynamic: true }));

        if (post.image.toLowerCase() !== 'none') embed.setImage(post.image);
        message.channel.send(embed)

        let reply = await getReply(message, { time: 30000 })
        if (!reply) return;
        if (reply.content.toLowerCase() === '!up') {
            if(DBPost.cheemGivers.includes(message.author.id)) return message.reply('You have already given Cheems to this post');
            if(DBPost.cheemTakers.includes(message.author.id)) { await client.DBPost.findByIdAndUpdate(DBPost._id, { $pull: { cheemTakers: message.author.id } }, { new: true, upsert: true}); }
              await client.DBPost.findByIdAndUpdate(DBPost._id, { $inc: { upvotes: 1 } }, { new: true, upsert: true });
              await client.DBUser.findByIdAndUpdate(DBPost.author, { $inc: { cheems: 1 } }, { new: true, upsert: true });
              await client.DBPost.findByIdAndUpdate(DBPost._id, { $push: { cheemGivers: message.author.id } }, { new: true, upsert: true});
              message.reply('Cheems Given! 😊')
          }
          else if (reply.content.toLowerCase() === '!down') {
            if(DBPost.cheemTakers.includes(message.author.id)) return message.reply('You have already taken Cheems to this post');
            if(DBPost.cheemGivers.includes(message.author.id)) { await client.DBPost.findByIdAndUpdate(DBPost._id, { $pull: { cheemGivers: message.author.id } }, { new: true, upsert: true}); }
              await client.DBPost.findByIdAndUpdate(DBPost._id, { $inc: { downvotes: 1 } }, { new: true, upsert: true });
              await client.DBUser.findByIdAndUpdate(DBPost.author, { $inc: { cheems: -1 } }, { new: true, upsert: true });
              await client.DBPost.findByIdAndUpdate(DBPost._id, { $push: { cheemTakers: message.author.id } }, { new: true, upsert: true});
              message.reply('Cheems Taken! 😢')
          }
    }
}

function nsfwPost(channel, posts){
  let post = posts.random()
  if(post.checked){
    if(channel.nsfw){
      return post
    }
    else if(!channel.nsfw){
      post = nsfwPost(channel, posts)
    }
  }
  return post
}
