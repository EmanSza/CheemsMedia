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

    execute: async function (client, message, args) {
        if (!args.length) {

            let AwEmbed = new MessageEmbed()
                .setTitle("Help Commands have Been Sent!")
                .setColor("RANDOM")

            let MIEmbed = new MessageEmbed()
                .setURL("https://discord.gg/jRnTbRPjdr")
                .setColor('#FD0061')
                .setTitle("Help Menu")
                .setDescription(`Use \`${PREFIX}help [command name]\` to get more info on a specific command, for example: \`${PREFIX}help ping\` \n Dont Forget to use the \`signup\` command to signup for our bot! `)
                .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 2048 }))
                .addFields(
                    { name: "**Misc**", value: "`ping` See how fast the bot is\n`up` give cheems to a image\n`down` take a cheem away from the image", inline: true },
                    { name: "**Post**", value: "`post` post a image\n`totalpost` See all the post of a user!\n`viewpost` View a Certain post by ID\n`deletepost` Delete one of your posts!!\n`random` View a Random post!\n`editdescription` Edit a post description!", inline: true },
                    { name: "**Guild**", value: "`channelfeed` Set the Guilds Feed\n`feeduser` Make the Guild Follow a user!\n`unfeedchannel` unSet the Guilds Feed\n`unfeeduser` Make the Guild unFollow a user!\n", inline: true },
                    { name: "**User**", value: "`signup` Create a Cheems Media Account!\n`block` Block a user!\n`unblock` unblock a user!\n`follow` Follow a user!\n`unfollow` unFollow a user!\n`directmessage` Message a user!\n", inline: true },
                    { name: "**Profile**", value: "`Profile` View yours or a users Profile!\n`setColor` See set your profiles color!\n`setbio`Set your profiles description!\n", inline: true }
                )
                try{
                await message.author.send(MIEmbed)
                await message.channel.send(AwEmbed)
        } catch {
            message.channel.send("Woops your DM's are closed so im Sending it here!")
            message.channel.send(MIEmbed)

        }
        }
        else {
            const cmdname = args[0].toLowerCase();
            const command = client.commands.get(cmdname) || client.commands.find(c => c.aliases && c.aliases.includes(cmdname));

            if (!command) return message.channel.send(`${message.author.username}, that\'s not a valid command!`)

            let hEmbed = new MessageEmbed()
                .setTitle(`${command.name}`)
                .setDescription(`${command.description}`)
                .setColor("RANDOM")
                .setTimestamp()
            if (command.usage) hEmbed.addField("Usage", `${command.usage}`)
            if (command.aliases && command.aliases.length !== 0) hEmbed.addField("Aliases", `${command.aliases.join(', ')}`)
            if (command.examples) hEmbed.addField("Examples", `${command.examples}`)
            if (client.guildInfoCache.get(message.guild.id).disabledCommands.includes(command.name)) hEmbed.setAuthor('This command is currently disabled in this server.')
            message.channel.send(hEmbed);
        }
    }
}
