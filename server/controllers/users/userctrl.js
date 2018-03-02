/**
 * Created by maoyuyang on 17/8/9.
 */
const mongoose = require('mongoose')
const User = require('../../model/user.model')
const auth = require('../../auth/auth')

exports.getMe = async (ctx, next) => {
    const userId = ctx.req.user._id
    //console.log(ctx.req.user)
    try {
        const user = await User.findById(userId)
        ctx.status = 200
        ctx.body = user.userInfo
    } catch (err) {
        ctx.throw(err)
    }
}

exports.login = async (ctx, next) => {
    let username = ctx.request.body.username
    let password = ctx.request.body.password

    try {
        const user = await User.findOne({ username: username })
        if (!user || !user.authenticate(password)) {
            ctx.status = 403
           return ctx.body = { error_msg: '用户名或密码错误.' }
        }
        const token = auth.signToken(user._id)
        ctx.body = { token: token }
    } catch(err) {
        ctx.throw(err)
    }

}

exports.register = async (ctx, next) => {
    let obj = ctx.request.body

    delete obj.checkPass

    console.log(obj)

    try {
        const findUser = await User.findOne({ username: obj.username })
        if (findUser) {
            ctx.status = 403
            return ctx.body = { error_msg: '用户名已存在.' }
        }

        let newUser = new User(obj)
        const user = await newUser.save()

        ctx.status = 200
        ctx.body = { success: true, user_id: user._id }

    } catch(err) {
        ctx.throw(err)
    }
}

