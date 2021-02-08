const PREFIX = require('../../../config/botconfig.json').PREFIX;
// Change DIR if needed

module.exports = {
    name: "signup",
    aliases: [],
    description: "Make a Account for Cheems Media",
    usage: `\`${PREFIX}\``,
    examples: `\`${PREFIX}\``,
    perms: [],
    cooldown: 0,

    execute: async function (client, message, args) {
        let DBUser = await client.DBUser.findByIdAndUpdate(message.author.id, {}, { new: true, upsert: true, setDefaultsOnInsert: true });

        if (!DBUser) {
            const fetch = await client.DBUser.findById(message.author.id);
            // When testing when making the 1st argument into a ID got a id of null pushing into dev branch
            DBUser = {}
            DBUser['_id'] = fetch._id
            DBUser['cheems'] = fetch.cheems
            DBUser['posts'] = fetch.posts.length
            DBUser['followers'] = fetch.followers
            DBUser['follows'] = fetch.follows
        }
        try {
            message.reply('You have been Signed up! make sure to read our TOS!')
        } catch (err) {
            console.log(err)
            message.reply(`Error!\nPlease Contact an Admin about this`)
        }

    }
}