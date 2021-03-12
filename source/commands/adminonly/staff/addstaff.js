// inside the async execute

module.exports = {
    name: "addstaff",
    description: "",
    usage: "",
    examples: "",
    cooldown: 0,
    someServersOnly: true,

    execute: async function(client, message, args) {
      if(!message.mentions.users.first()) return message.reply('You need to mention user for staff `!addstaff <mention> <job>` ')
      if(!args[1]) return message.reply('You need to enter job for staff `!addstaff <mention> <job>` ')
      const staff = client.stafflist.filter(function (staff) {
        staff._id === message.mentions.users.first().id
      })

      if (staff.name) return message.reply(`${staff.name} is already registered as ${staff.job}`)

      await new client.DBStaff({
        _id: message.mentions.users.first().id,
        job: args[1],
        name: message.mentions.users.first().username,
        avatar: message.mentions.users.first().avatarURL()

      }).save()

      message.reply(`<@${message.mentions.users.first().id}> successfully registered as ${args[1]}`)
      client.stafflist = await client.DBStaff.find({})
      var admins = []
      var devs = []
      client.stafflist.forEach(function (s) {
        if (s.job == 'admin') admins.push(s._id)
        else if (s.job == 'developer') devs.push(s._id)
      })
      client.admins = admins
      client.devs = devs
    }
}
