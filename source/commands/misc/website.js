const { PREFIX } = require('../../../config/botconfig.json');
// Change DIR if needed

module.exports = {
    name: "ping",
    aliases: [],
    description: "",
    usage: `\`See how fast the bot is\``,
    examples: `\`${PREFIX}ping\``,
    perms: [],
    cooldown: 0,

    execute: async function(client, message, args) {
       message.channel.send('cheemsmedia.xyz')
    }
}