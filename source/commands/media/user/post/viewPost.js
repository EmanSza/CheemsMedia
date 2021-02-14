const PREFIX = require('../../../../../config/botconfig.json').PREFIX;
const getReply = require('../../../../utils/utils');
const { MessageEmbed } = require('discord.js');
// Change DIR if needed

module.exports = {
    name: "viewpost",
    aliases: ["vp", "viewp"],
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

        // return console.log(post)
        //const user = await client.users.fetch(post.author);
        let DBPost = await client.DBPost.findById(postID);
        if (!DBPost) {
            const fetch = await client.DBPost.findById(postID);
            // When testing when making the 1st argument into a ID got a id of null pushing into dev branch
            DBPost = {}
            DBPost['_id'] = fetch._id
            DBPost['title'] = fetch.title
            DBPost['description'] = fetch.description
            DBPost['author'] = fetch.author
            DBPost['image'] = fetch.image
          }
          let post = {
            _id: DBPost._id,
            title: DBPost.title,
            description: DBPost.description,
            author: DBPost.author,
            image: DBPost.image
        }

        const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(post.title)
        .setDescription(post.description)
        .setFooter(post.author);

        if (post.image.toLowerCase() !== 'none') embed.setImage(post.image);

        message.channel.send(embed)
    }
}