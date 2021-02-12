const PREFIX = require('../../../../../config/botconfig.json').PREFIX;
// Change DIR if needed

module.exports = {
    name: "setBio",
    aliases: [],
    description: "",
    usage: `\`${PREFIX}\``,
    examples: `\`${PREFIX}\``,
    perms: [],
    cooldown: 0,

    execute: async function(client, message, args) {
        message.channel.send('testing')
    }
}