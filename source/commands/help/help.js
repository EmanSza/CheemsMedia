const PREFIX = require('../../../config/botconfig.json').PREFIX;
const { MessageEmbed } = require("discord.js");


module.exports = {
    name: 'help',
    aliases: ["h"],
    description: "Get help on commands.",
    cooldown: 0,
    usage: `To get help on a specific command, use \`${PREFIX}help [command name]\` (without the [ ]).\nFor a full list of all commands, simply use \`${PREFIX}help\`.`,
    examples: `\`${PREFIX}help ping\``,
    canNotDisable: true,
    
    execute: async function(client, message, args) {
        if (!args.length) {
            let hEmbed = new MessageEmbed()
            .setTitle("Commands")
            .setURL("https://discord.gg/jRnTbRPjdr")
            .setColor("RANDOM")
            .setDescription(`Use \`${PREFIX}help [command name]\` to get more info on a specific command, for example: \`${PREFIX}help ping\``)
            .setThumbnail(client.user.displayAvatarURL())  


            let AwEmbed = new MessageEmbed()
            .setTitle("Help Commands have Been Sent!")
            .setColor("RANDOM")

            let MIEmbed = new MessageEmbed()
            .setURL("https://discord.gg/jRnTbRPjdr")
            .setColor(EMBED_COLOR)
            .setTitle("Commands")
            .addFields(
                {name: "**Misc**", value:"``ping`` See how fast the bot is\n ``up`` give cheems to a image\n ``down`` take a cheem away from the image", inline: true},
                {name: "**Media**", value:"``post`` post a image\n ``profile`` see your profile statistics\n ``random`` get a random image\n", inline: true},
             )
             PEmbed = new MessageEmbed()
                .setColor(EMBED_COLOR)
                .setTitle("Premium Commands")
<<<<<<< Updated upstream


            message.channel.send(AwEmbed).then
            setTimeout(function() {
                message.author.send(hEmbed)
            }, 500).then
            setTimeout(function() {
                message.author.send(MIEmbed)
            }, 501)
=======
                try{
                await message.author.send(hEmbed)
                await message.author.send(MIEmbed)
                await message.channel.send(AwEmbed)
        } catch {
            
            message.channel.send("Woops your DM's are closed")

            message.channel.send(hEmbed)
            message.channel.send(MIEmbed)

        }
>>>>>>> Stashed changes
        }
        else {
            const cmdname = args[0].toLowerCase();
            const command = client.commands.get(cmdname) || client.commands.find(c => c.aliases && c.aliases.includes(cmdname));

            if (!command) return message.channel.send(`${message.author.username}, that\'s not a valid command!`)

            let hEmbed = new MessageEmbed()
            .setTitle(`${command.name}`)
            .setDescription(`${command.description}`)
            .setColor(EMBED_COLOR)
            .setTimestamp()
            if (command.usage) hEmbed.addField("Usage", `${command.usage}`)
            if (command.aliases && command.aliases.length !== 0) hEmbed.addField("Aliases", `${command.aliases.join(', ')}`)
            if (command.examples) hEmbed.addField("Examples", `${command.examples}`)
            if (client.guildInfoCache.get(message.guild.id).disabledCommands.includes(command.name)) hEmbed.setAuthor('This command is currently disabled in this server.')
            message.channel.send(hEmbed);
        }
    }
}