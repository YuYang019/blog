/**
 * Created by maoyuyang on 17/8/9.
 */
const md5 = require('md5')
const mongoose = require('mongoose')
const User = require('../../database/User.js')

class UserController {
    async getMe(ctx) {
        let obj = {}
        await  new Promise(resolve => {
            obj.nickname = 'maoyuyang'
            ctx.response.body = obj
            resolve()
        })
    }
    async login(ctx) {
        //let obj = {}
        console.log(ctx.request.body)
        await new Promise((resolve, reject) => {
            ctx.response.body = {
                status: 'success',
                token: '24jknsjkd213'
            }
            resolve()
        })
    }
    async register(ctx) {
        let obj = {}
        console.log(ctx.request.body)
        await new Promise((resolve, reject) => {
            obj.code = -1
            ctx.response.body = obj
            resolve()
        })
    }
}

module.exports = new UserController()