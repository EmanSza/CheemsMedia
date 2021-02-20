const PREFIX = require('../../../../../config/botconfig.json').PREFIX;
// Change DIR if needed

module.exports = {
    name: "toggledms",
    aliases: ["dmoff", "dmon", "toggledm"],
    description: "",
    usage: `\`${PREFIX}\``,
    examples: `\`${PREFIX}\``,
    perms: [],
    cooldown: 0,

    execute: async function(client, message, args) {
        let DBUser = await client.DBUser.findById(message.author.id);
        if (!DBUser) return message.reply('You must signup using the signup command!');
        
        if(DBUser.dmOpt === true)  {
            await client.DBUser.findByIdAndUpdate(message.author.id, { $set: { dmOpt: false  } }, { new: true, upsert: true });
            message.reply('I have disabled you\`re DMs')
        } else /* If dmOpt is true*/ {
            await client.DBUser.findByIdAndUpdate(message.author.id, { $set: { dmOpt: true  } }, { new: true, upsert: true });
            message.reply('I have enabled you\`re DMs')
        }
    }
}