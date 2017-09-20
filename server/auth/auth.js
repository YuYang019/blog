/**
 * Created by maoyuyang on 17/8/30.
 */
const mongoose = require('mongoose')
const koajwt = require('koa-jwt')
const User = mongoose.model('User')
const jwt = require('jsonwebtoken')
const passport = require('koa-passport')
const config = require('../config/index')
const compose = require('koa-compose')

function authToken() {
    return compose([
        // 验证Authorization header的token，如果是有效的，解析之后的token将被加到ctx.state.user上
        koajwt({ secret: config.session.secrets, passthrough: true })
    ])
}

function isAuthenticated() {
    return compose([
        authToken(),
        async (ctx, next) => {
            // 如果没有这个，说明之前的token验证失败
            if (!ctx.state.user) ctx.throw('UnauthorizedError', 401)
            await next()
        },
        async (ctx, next) => {
            // 由下面的signToken可知，token生成的时候依据了一个_id，所以我们拿到的token肯定也有一个_id，这个id应该是用户的id
            var user = await User.findById(ctx.state.user._id)
            if (!user) ctx.throw('UnauthorizedError', 401)
            // 往req请求上加上user
            ctx.req.user = user
            await next()
        }
    ])
}

function signToken(id) {
    // 参数分别为：payload, secretKey, options
    return jwt.sign({ _id: id }, config.session.secrets, { expiresIn: config.session.cookie.maxAge })
}

exports.isAuthenticated = isAuthenticated
exports.signToken = signToken