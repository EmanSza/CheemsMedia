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
        if(!DBPost) return ('I Could not find a post!')

        const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(DBPost.title)
        .setDescription(DBPost.description)
        .setFooter(DBPost.author);

        if (DBPost.image.toLowerCase() !== 'none') embed.setImage(DBPost.image);

        message.channel.send(embed)
    }
}