/**
 * Created by maoyuyang on 17/9/13.
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

let CommentSchema = new Schema ({
    aid: {
        type: Schema.Types.ObjectId,
        ref: 'Article'
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: String,
    replys: [{
        content: String,
        user_info: Object,
        created: Date
    }],
    status: { // 0删除，1正常
        type: Number,
        default: 1
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    // 回复目标的ID
    inReplyToUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    // 评论所在会话
    conversation_id: {
        type: Schema.Types.ObjectId,
        ref: 'Conversation',
        default: null
    }
})

exports.CommentSchema = CommentSchema

// mongoose会自动创建一个名为comments的collection
module.exports = mongoose.model('Comment', CommentSchema)