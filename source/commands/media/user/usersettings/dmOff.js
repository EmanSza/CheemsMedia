const PREFIX = require('../../../../../config/botconfig.json').PREFIX;
const { databaseCheck } = require('../../../../utils/utils')
// Change DIR if needed

module.exports = {
    name: "dmon",
    aliases: [],
    description: "",
    usage: `\`${PREFIX}\``,
    examples: `\`${PREFIX}\``,
    perms: [],
    cooldown: 0,

    execute: async function(client, message, args) {
        let DBUser = await client.DBUser.findById(message.author.id);
        if (!DBUser) return message.reply('You must signup using the signup command!');

        if(DBUser.dmOpt == true) return message.reply('Your DMs are already enabled!')

        await client.DBUser.findByIdAndUpdate(message.author.id, { $set: { dmOpt: true  } }, { new: true, upsert: true });
    }
}