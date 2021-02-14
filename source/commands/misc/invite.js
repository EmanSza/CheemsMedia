const { PREFIX, MONGOURI} = require('../../../config/botconfig.json');
const mongoose = require('mongoose')
// Change DIR if needed

module.exports = {
    name: "invite",
    aliases: [],
    description: "",
    usage: `\`See how fast the bot is\``,
    examples: `\`${PREFIX}ping\``,
    perms: [],
    cooldown: 0,

    execute: async function(client, message, args) {
       message.channel.send('invite.cheemsmedia.xyz');
    }
}