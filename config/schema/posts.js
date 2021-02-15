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
        type: String,
        default: "unchecked"
    },
    comments: commentSchema
})

module.exports = model('posts', postSchema);