/**
 * Created by maoyuyang on 17/8/10.
 */
const mongoose = require('mongoose')
const crypto = require('crypto')
const config = require('../config')

//mongoose.connect('mongodb://localhost/user')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    hashedPassword: String,
    salt: String,
    status: {
        type: Number,
        default: 0
    },
    role: {
        type: String,
        default: 'user'
    },
    likeList: [{
        type: Schema.Types.ObjectId,
        ref: 'Article'
    }],
    avatar: {
        type: String,
        default: 'http://img2.imgtn.bdimg.com/it/u=1931481219,2668969167&fm=27&gp=0.jpg',
    },
    created: {
        type: Date,
        default: Date.now
    }
})

userSchema
    .virtual('password')
    .set(function(password) {
        this._password = password
        this.salt = this.makeSalt()
        this.hashedPassword = this.encryptPassword(password)
    })
    .get(function() {
        return this._password
    })

userSchema
    .virtual('userInfo')
    .get(function() {
        return {
            'id': this._id,
            'username': this.username,
            'role': this.role,
            'avatar': this.avatar,
            'likes': this.likeList
        }
    })

// 当save的时候会执行这个用户名验证
userSchema
    .path('username')
    .validate({
        isAsync: true,
        validator: function (v, cb) {
            const self = this
            self.constructor.findOne({ username: v }, function(err, user) {
                if (user && self.id !== user.id) {
                    cb(false)
                }
            })
            cb(true)
        }
    })

userSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashedPassword
    },
    makeSalt: function() {
        return crypto.randomBytes(16).toString('base64')
    },
    encryptPassword: function(password) {
        if (!password || !this.salt) return ''
        let salt = new Buffer(this.salt, 'base64')
        return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha1').toString('base64')
    }
}

// 让虚拟属性能够返回给客户端
userSchema.set('toObject', { virtuals: true })

const User = mongoose.model('User', userSchema)

exports.userSchema = userSchema
module.exports = User