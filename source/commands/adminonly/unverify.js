const { PREFIX, BOTADMINS} = require('../../../config/botconfig.json').PREFIX;
// Change DIR if needed

module.exports = {
    name: "unverify",
    aliases: [],
    description: "",
    usage: `\`${PREFIX}\``,
    examples: `\`${PREFIX}\``,
    perms: [],
    cooldown: 0,
    devOnly: false,
    adminOnly: true,
    someServersOnly: false,

    execute: async function(client, message, args) {


        let DBUser = await client.DBUser.findById(message.author.id);
        if (!DBUser) return message.reply('You must signup using the signup command!');

        let user = client.users.cache.get(args[0]) || message.mentions.users.first();
        if (!user) return('You must Mention a user!')
        
        try{
            await client.DBUser.findByIdAndUpdate(user.id, { $set: { verified: false  } }, { new: true, upsert: true });
                message.reply(`user ${user.tag} has been unverified`) 
        }catch(err) {
            console.log(err)
        }
    }
}