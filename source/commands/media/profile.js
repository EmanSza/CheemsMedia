const PREFIX = require('../../../config/botconfig.json').PREFIX;
const { MessageEmbed } = require('discord.js')
// Change DIR if needed

module.exports = {
    name: "profile",
    aliases: [],
    description: "",
    usage: `\`See your profile\``,
    examples: `\`${PREFIX}profile\``,
    perms: [],
    cooldown: 0,

    execute: async function(client, message, args) {
        let DBUser = await client.DBUser.findById(message.author.id);
    if (!DBUser) {
        const fetch = await client.DBUser.findById(message.author.id, { new: true, upsert: true });
        DBUser['_id'] = fetch._id
        DBUser['cheems'] = fetch.cheems
        DBUser['posts'] = fetch.posts.length
    }
    const cheems = DBUser.cheems;
    const userid = DBUser._id;
    const postlength = DBUser.posts.length


    const profile = new MessageEmbed()
    .setTitle(message.author.tag)
    .addFields(
        {name: "Total Posts:", value: postlength, inline: false },
        {name: "Total Cheems", value: cheems, inline: false }
    )
    .setThumbnail(message.author.displayAvatarURL())
    message.channel.send(profile)
    }
}