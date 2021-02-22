const PREFIX = require('../../../../config/botconfig.json').PREFIX;

module.exports = {
    name: "unfeedchannel",
    aliases: ["unfc", "unfeed"],
    description: "Set a follow channel",
    usage: `\`${PREFIX}follow\``,
    perms: ['MANAGE_CHANNELS'],
    cooldown: 10,

    execute: async function (client, message, args) {
        const guild = await client.DBGuild.findById(message.guild.id)
        const channel = message.guild.channels.cache.get(args[0]) || message.mentions.channels.first()
        if(!channel) return message.reply('Please provide an valid channel!')
        await client.DBGuild.findByIdAndUpdate(message.guild.id, {$unset: {feedChannel: channel.id}, new: true, upsert: true})
        message.reply('I have unfeeded this channel!')
    }
}