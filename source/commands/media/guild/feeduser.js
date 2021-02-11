const PREFIX = require('../../../../config/botconfig.json').PREFIX;

module.exports = {
    name: "feeduser",
    aliases: ["fu", "feed"],
    description: "Set a user when they post a there's a notification on channel",
    usage: `\`${PREFIX}follow\``,
    perms: ['MANAGE_CHANNELS'],
    cooldown: 0,

    execute: async function (client, message, args) {
        const guild = await client.DBGuild.findById(message.guild.id)
        if(!guild) return message.reply('There\'s no channel set for this!')
        const user = message.client.users.cache.get(args[0]) ||message.mentions.users.first();
        if(!user) return message.reply('That user doesn\'t exists')
        if(guild.followedPosters.includes(user.id)) return message.channel.send('You are already following this user')
        await client.DBGuild.findByIdAndUpdate(message.guild.id, {$push: {followedPosters: user.id}, new: true, upsert: true})
        message.reply('I will now giving feeds when the user posts!')
    }
}