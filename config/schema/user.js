const { Schema, model } = require('mongoose');

const userSchema = Schema({
    _id: String,
    posts: [String],
    followers: {
        type: [String],
        default: [],
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
    },
    blocked: {
        type: [String],
        default: []
    }
});

module.exports = model('users', userSchema);