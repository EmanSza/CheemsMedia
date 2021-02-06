const PREFIX = require('../../../config/botconfig.json').PREFIX;
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
        message.reply('Calculating ping...').then((resultMessage) => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp
      
            resultMessage.edit(`Bot latency: ${ping}, API Latency: ${client.ws.ping}`)
          })
    }
}