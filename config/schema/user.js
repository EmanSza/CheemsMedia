const { Schema, model } = require('mongoose');

const userSchema = Schema({
    _id: String,
    posts: [String],
    followers: {
        default: 0,
        type: Number
    },
    cheems: Number,
    follows: [String]
});

module.exports = model('users', userSchema);