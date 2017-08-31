/**
 * Created by maoyuyang on 17/8/9.
 */
const Router  = require('koa-router')
const userctrl = require('./controllers/users/userctrl')

const router = new Router()

router
    .get('/api/user/me', userctrl.getMe)
    .post('/api/user/login', userctrl.login)
    .post('/api/user/register', userctrl.register)

module.exports = router