const {Schema, model} = require('mongoose')

const userSchema = Schema({
    _id: String,
    registered: Boolean,
})

module.exports = model('user', userSchema)