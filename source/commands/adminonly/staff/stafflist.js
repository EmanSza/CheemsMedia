const Discord = require("discord.js");
// inside the async execute

module.exports = {
    name: "stafflist",
    description: "",
    usage: "",
    examples: "",
    cooldown: 0,
    someServersOnly: true,

    execute: async function(client, message, args) {
      var staff = client.stafflist
      var devs = []
      var admins = []
      staff.forEach(function (s) {
        if (s.job == 'admin') admins.push(`<@${s._id}>`)
        else if (s.job == 'developer') devs.push(`<@${s._id}>`)
      })


      const embed = new Discord.MessageEmbed()
      .setTitle('Cheems media staff')
      .addField('Developers', devs.join(' | ') || 'There is no one as developer')
      .addField('Admins', admins.join(' | ') || 'There is no one as admin')
      .setColor('#FD0061')

      message.channel.send(embed)
    }
}
