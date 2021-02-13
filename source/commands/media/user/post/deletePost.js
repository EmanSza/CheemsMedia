const PREFIX = require('../../../../../config/botconfig.json').PREFIX;
const getReply = require('../../../../utils/utils');
const { MessageEmbed } = require('discord.js');
// Change DIR if needed

module.exports = {
    name: "deletepost",
    aliases: ["dp", "deletep"],
    description: "",
    usage: `\`${PREFIX}\``,
    examples: `\`${PREFIX}\``,
    perms: [],
    cooldown: 0,

    execute: async function(client, message, args) {
    let DBUser = await client.DBUser.findById(message.author.id);
    if (!DBUser) return message.reply('You must signup using the signup command!');


      let postID = args.splice(0).join(' ');
      if(!postID) return message.reply('You need to give a ID!');

        let DBPost = await client.DBPost.findById(postID);
        if (!DBPost) {
            const fetch = await client.DBPost.findById(postID);
            DBPost = {}
            DBPost['_id'] = fetch._id
            DBPost['author'] = fetch.author
          }
          let post = {
            id: DBPost._id,
            author: DBPost.author,
        }
        console.log('Above IF')
          if(message.author.id !== DBPost.author) return message.reply('You are not the author of this post!')
        console.log('below if')
          await client.DBPost.findByIdAndDelete(postID, { posts: post.id });
          try {
              message.reply(`Post ${postID} has been deleted!`)
              console.log(chalk.red(`<${client.user.tag}>`) + (' ') + chalk.blue(`Post ID: ${postID} was deleted by `))
          } catch(err) {
            message.reply(`Error!\nPlease Contact an Admin about this`)
          }
    }
}