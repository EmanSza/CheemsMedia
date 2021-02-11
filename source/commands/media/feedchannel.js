const PREFIX = require('../../../config/botconfig.json').PREFIX;

module.exports = {
    name: "feedchannel",
    aliases: ["fc", "feed"],
    description: "Set a follow channel",
    usage: `\`${PREFIX}follow\``,
    perms: ['MANAGE_CHANNELS'],
    cooldown: 0,

    execute: async function (client, message, args) {
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
        if(!channel) return message.reply('Please provide an valid channel!')
        await client.DBGuild.findByIdAndUpdate(message.guild.id, {feedChannel: channel.id}, {new: true, upsert: true})
        message.reply('The new channel is set!')
    }
}