const PREFIX = require('../../../../../config/botconfig.json').PREFIX;
const { MessageEmbed } = require('discord.js')
const { getReply } = require('../../../../utils/utils')
// Change DIR if needed

module.exports = {
    name: "random",
    description: "Get a random post",
    usage: `\`${PREFIX}random\``,
    cooldown: 5,

    execute: async function(client, message) {
        let posts = await client.DBPost.find({});
        let post = nsfwPost(message.channel, posts)
        if(post.checked != true) await client.DBPost.find({});

        // return console.log(post)
        const user = await client.users.fetch(post.author);

        const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(post.title)
        .setDescription(post.description)
        .setFooter(user.tag + ` Post id: ${post._id}`, user.displayAvatarURL({ dynamic: true }));

        if (post.image.toLowerCase() !== 'none') embed.setImage(post.image);
        message.channel.send(embed)

        let reply = await getReply(message, { time: 30000 })
        if (!reply) return;
        if (reply.content.toLowerCase() == '!up') {
          if(post.cheemGivers.includes(message.author.id)) return message.reply('You have already gave Cheems to this post');
          if(post.cheemTakers.includes(message.author.id)) { 
            await client.DBPost.findByIdAndUpdate(post._id, { $pull: { cheemTakers: message.author.id }, $inc: { cheems: 1 } }, { new: true, upsert: true}); 
          } else {
            await client.DBPost.findByIdAndUpdate(post._id, { $inc: { cheems: 1 }, $push: { cheemTakers: message.author.id } }, { new: true, upsert: true });
          }
          await client.DBUser.findByIdAndUpdate(post.author, { $inc: { cheems: 1 } }, { new: true, upsert: true });
          message.reply('Cheems Given! 😊')
        }
        else if (reply.content.toLowerCase() == '!down') {
          if(post.cheemTakers.includes(message.author.id)) return message.reply('You have already taken Cheems to this post');
          if(post.cheemGivers.includes(message.author.id)) { 
            await client.DBPost.findByIdAndUpdate(post._id, { $pull: { cheemGivers: message.author.id }, $inc: { cheems: -1 }  }, { new: true, upsert: true}) 
          }
          else {
            await client.DBPost.findByIdAndUpdate(post._id, { $inc: { cheems: -1 }, $push: { cheemTakers: message.author.id } }, { new: true, upsert: true })
          }
          await client.DBUser.findByIdAndUpdate(post.author, { $inc: { cheems: -1 } }, { new: true, upsert: true });
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
