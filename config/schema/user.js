const { Schema, model } = require('mongoose');

const userSchema = Schema({
    _id: String,
    posts: [String],
    followers: Number,
    cheems: Number,
    follows: [String]
});

module.exports = model('users', userSchema);