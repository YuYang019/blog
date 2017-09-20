/**
 * Created by maoyuyang on 17/9/14.
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ConversationSchema = new Schema({
    content: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
})

module.exports = mongoose.model('Conversation', ConversationSchema)

