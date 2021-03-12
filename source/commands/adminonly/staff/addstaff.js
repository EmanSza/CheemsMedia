// inside the async execute

module.exports = {
    name: "addstaff",
    description: "",
    usage: "",
    examples: "",
    cooldown: 0,
    someServersOnly: true,

    execute: async function(client, message, args) {
      if(message.author.id != '455831445949120535') return message.reply(`Only <@519861424017768451> can add staff`)
      if(!message.mentions.users.first()) return message.reply('You need to mention user for staff `!addstaff <mention> <job>` ')
      if(!args[1]) return message.reply('You need to enter job for staff `!addstaff <mention> <job>` ')
      console.log(client.stafflist)
      const staff = client.stafflist.filter(function(staff){
        return staff._id === message.mentions.users.first().id
      })
      console.log(staff)
      
      if (staff[0].name) return message.reply(`${staff[0].name} is already registered as ${staff[0].job}`)

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
