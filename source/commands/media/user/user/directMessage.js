const PREFIX = require('../../../../../config/botconfig.json').PREFIX;
// Change DIR if needed

module.exports = {
    name: "directmessage",
    aliases: ["message", "dm"],
    description: "",
    usage: `\`${PREFIX}\``,
    examples: `\`${PREFIX}\``,
    perms: [],
    cooldown: 0,

    execute: async function(client, message, args) {
        let DBAuthor = await client.DBUser.findById(message.author.id);
        if (!DBAuthor) return message.reply('You must signup using the signup command!');

        let user = client.users.cache.get(args[0]) || message.mentions.users.first();
        if (!user) return('You must DM a user!')
        if(user.id === message.author.id) return message.reply('You cannot DM yourself!')

        let DBUser = await client.DBUser.findById(user.id)
        if(!DBUser) message.reply(`${user.tag} is not apart of Cheems Media!`)
        if(DBUser.dmOpt === false) return('This user has there DMs Disabled!')

        if(DBUser.blocked.some(id => id === message.author.id)) return message.reply('you cannot Message this user!')

        let Dmessage = args.splice(1).join(' ');
        if (!Dmessage) return message.reply('You must give me a message!');

        try{
        user.send(`${message.author.tag} has sent: ${Dmessage}`)
        message.author.send(`You sent ${user.tag}: ${Dmessage}`)
        message.channel.send('Sent the Message!')
        } catch {
            message.channel.send('One of the Users has there DMs closed')
        }
        
        
    }
}