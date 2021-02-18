const { PREFIX, BOTADMINS} = require('../../../config/botconfig.json').PREFIX;
// Change DIR if needed

module.exports = {
    name: "check",
    aliases: [],
    description: "",
    usage: `\`${PREFIX}\``,
    examples: `\`${PREFIX}\``,
    perms: [],
    cooldown: 0,
    devOnly: true,
    adminOnly: true,
    someServersOnly: false,

    execute: async function(client, message, args) {

        let postID = args.splice(0).join(' ');
        if (!postID) return message.reply('Give me a postID!!');
        let DBPost = await client.DBPost.findById(postID);
        if (!DBPost) return message.reply('Could not find a post with that ID!')
        
        const channel = client.channels.cache.get('811760394511188019')
        
        try{
            if(DBPost.checked == true) return message.reply('This post has already been checked')
            await client.DBPost.findByIdAndUpdate(user.id, { $set: { checked: true  } }, { new: true, upsert: true });
                message.reply(`user ${user.tag} has been verified`)
            channel.send(`${postID} has been checked by ${message.author.id}`)
        }catch(err) {
            console.log(err)
        }
    }
}