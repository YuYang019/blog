/**
 * Created by maoyuyang on 17/9/9.
 */

const mongoose  = require('mongoose')
const Schema = mongoose.Schema

let ArticleSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        unique: true
    },
    content: String,
    images: {
        type: Array
    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    }],
    visit_count: {
        type: Number,
        default: 1
    },
    like_count: {
        type: Number,
        default: 0
    },
    comment_count: {
        type: Number,
        default: 0
    },
    status: {
        type: Number, // 0草稿，1发布
        default: 0
    },
    created: {
        type: Date,
        default: Date.now
    },
    publish_time: {
        type: Date,
        default: Date.now
    },
    update: {
        type: Date,
        default: Date.now
    }
})

ArticleSchema
    .virtual('info')
    .get(function() {
        return {
            '_id': this._id,
            'authorInfo': this.authorInfo,
            'title': this.title,
            'content': this.content,
            'images': this.images,
            'visit_count': this.visit_count,
            'comment_count': this.comment_count,
            'like_count': this.like_count,
            'publish_time': this.publish_time
        }
    })

exports.CommentSchema = ArticleSchema
module.exports = mongoose.model('Article', ArticleSchema)