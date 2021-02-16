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
    },
    color: {
        type: String,
        default: '#bf1932'
    },
    bio: {
        type: String,
        default: 'A User Description'
    },
    verified: {
        type: Boolean,
        default: false
    }
});

module.exports = model('users', userSchema);
