const { PREFIX, BOTADMINS} = require('../../../config/botconfig.json').PREFIX;
// Change DIR if needed

module.exports = {
    name: "verify",
    aliases: [],
    description: "",
    usage: `\`${PREFIX}\``,
    examples: `\`${PREFIX}\``,
    perms: [],
    cooldown: 0,
    devOnly: true,
    adminOnly: true,
    someServersOnly: false,

    execute: async function(client, message, args) {


        let DBUser = await client.DBUser.findById(message.author.id);
        if (!DBUser) return message.reply('You must signup using the signup command!');

        let user = client.users.cache.get(args[0]) || message.mentions.users.first();
        if (!user) return('You must Mention a user!')
        
        try{
            await client.DBUser.findByIdAndUpdate(user.id, { $set: { verified: true  } }, { new: true, upsert: true });
                message.reply(`user ${user.tag} has been verified`) 
        }catch(err) {
            console.log(err)
        }
    }
}