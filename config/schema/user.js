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
    follows: {
        type: [String],
        default: []
    },
    joindate: {
        type: String
    }
});

module.exports = model('users', userSchema);