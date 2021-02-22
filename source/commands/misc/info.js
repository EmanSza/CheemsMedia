const { PREFIX } = require('../../../config/botconfig.json');
const { MessageEmbed } = require('discord.js')
// Change DIR if needed

module.exports = {
    name: "info",
    aliases: [],
    description: "",
    usage: `\`See how fast the bot is\``,
    examples: `\`${PREFIX}ping\``,
    perms: [],
    cooldown: 5,

    execute: async function(client, message, args) {
        const embed = new MessageEmbed()
        .setTitle('Bot Information')
        .addFields(
            { name: "**Board Members**", value: "`EmanSza` Founder and Developer\n`Canta` Founder and Developer\n`Spik` Developer and Owner\n`KrabbyBuckets` Website Developer and Owner\n", inline: true },
            { name: "**Developers**", value: "`Depression` Bot Developer\n", inline: true },
            { name: "**Links**", value: "`website` https://cheemsmedia.xyz\n`Discord` https://join.cheemsmedia.xyz\n`invite` https://invite.cheemsmedia.xyz\n", inline: true },
            { name: "**Langauge**", value: "Discord.js", inline: true },
          // { name: "**Extra Embed**", value: "`` \n", inline: true },
        )
        .setColor('#FD0061')
       message.channel.send(embed)
    }
}