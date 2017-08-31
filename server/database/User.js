/**
 * Created by maoyuyang on 17/8/10.
 */
const mongoose = require('mongoose')
const crypto = require('crypto')
const config = require('../config')

mongoose.connect('mongodb://localhost/user')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    remember: Boolean,
})

const User = mongoose.model('User', userSchema)

module.exports = User