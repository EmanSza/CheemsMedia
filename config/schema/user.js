const { Schema, model } = require('mongoose');

const userSchema = Schema({
    _id: String,
    posts: [String],
    followers: {
        type: Number,
        default: 0,
    },
    cheems: {
        type: Number,
        default: 0,
    },
    follows: [String]
});

module.exports = model('users', userSchema);