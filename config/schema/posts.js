const { Schema, model } = require('mongoose');

const commentSchema = Schema({
    _id: String,
    comment: String,
    id: String,
    upvotes: Number,
    downvotes: Number
})

const postSchema = Schema({
    _id: String,
    author: String,
    title: String,
    description: String,
    image: String,
    upvotes: Number,
    downvotes: Number,
    checked: {
        type: Boolean,
        default: false
    },
    cheemGivers: {
        type: [String],
        default: []
    },
    cheemTakers: {
        type: [String],
        default: []
    },
    comments: commentSchema
})

module.exports = model('posts', postSchema);
