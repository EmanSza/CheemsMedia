const PREFIX = require('../../../config/botconfig.json').PREFIX;
// Change DIR if needed

module.exports = {
    name: "",
    aliases: [],
    description: "",
    usage: `\`${PREFIX}\``,
    examples: `\`${PREFIX}\``,
    perms: [],
    cooldown: 0,

    execute: async function(client, message, args) {
        let DBUser = await client.DBUser.findById(message.author.id);
        if (!DBUser) return message.reply('You must signup using the signup command!')

        let user = client.users.cache.get(args[0]) || message.mentions.users.first();
        if (user.id === message.author.id) return message.reply('You cannot follow yourself');
        if (!user) return message.reply('You must give me a users ID!')


        await client.DBUser.findByIdAndUpdate(message.author.id, { $push: { follows: follow.follows } }, { new: true, upsert: true });
        await client.DBUser.findByIdAndUpdate(user.id, { $push: { followers: following.following }, new: true, upsert: true });
        try {
          
        } catch (err) {

        }
    }
}