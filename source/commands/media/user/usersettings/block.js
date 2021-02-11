const PREFIX = require('../../../../../config/botconfig.json').PREFIX;
// Change DIR if needed

module.exports = {
    name: "block",
    aliases: [],
    description: "",
    usage: `\`${PREFIX}\``,
    examples: `\`${PREFIX}\``,
    perms: [],
    cooldown: 0,

    execute: async function (client, message, args) {
        let DBUser = await client.DBUser.findById(message.author.id);
        if (!DBUser) return message.reply('You must signup using the signup command!')

        let user = client.users.cache.get(args[0]) || message.mentions.users.first();
        if (user.id === message.author.id) return message.reply('You cannot block yourself');
        if (!user) return message.reply('You must give me a users ID!')
        
        let block = { blocked: user.id }

        await client.DBUser.findByIdAndUpdate(message.author.id, { $push: { blocked: block.blocked } }, { new: true, upsert: true });
        try {
            message.reply(`I have blocked ${user.tag}`)
        } catch (err) {
            console.log(err);
            message.reply(`Error!\nPlease Contact an Admin about this`)
        }
    }
}