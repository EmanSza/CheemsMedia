const PREFIX = require('../../../../../config/botconfig.json').PREFIX;
// Change DIR if needed

module.exports = {
    name: "setbio",
    aliases: [],
    description: "",
    usage: `\`${PREFIX}\``,
    examples: `\`${PREFIX}\``,
    perms: [],
    cooldown: 20,

    execute: async function(client, message, args) {
        let DBUser = await client.DBUser.findById(message.author.id);
        if (!DBUser) return message.reply('You must signup using the signup command!')
    
        let description = args.splice(0).join(' ');
        if (message.content.length > 100) return message.reply('Your profile cannot go above 100')
        if (!description) return message.reply('Please give me a bio!!');
        try {
            await client.DBUser.findByIdAndUpdate(message.author.id, { $set: { bio: description } }, { new: true, upsert: true });
            message.reply(`Your Profile Bio is now ${description}`)
        } catch(err) {
            console.log(err)
            message.reply(`Error!\nPlease Contact an Admin about this`)
        }
    }
}