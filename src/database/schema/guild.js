const {Schema, model} = require('mongoose')

const guildSchema = Schema({
    _id: String,
})

module.exports = model('guild', guildSchema)