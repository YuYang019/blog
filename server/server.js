/**
 * Created by maoyuyang on 17/8/8.
 */
//process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const router = require('./router')
const cors = require('koa-cors')
const session = require('koa-generic-session')
const RedisStore = require('koa-redis')
const mongoose = require('./connect')
const config = require('./config')

const app = new Koa()

// 重要！！不设置的话就报错, 因为koa-generic-session里用到了ctx自带的cookies
// 而ctx.cookies必须要设置keys, 作为加密cookie的密钥
// 这个bug找了好久。。
app.keys = [config.session.secrets]

app.use(bodyParser())
// app.use(cors())
app.use(session({
  key: 'myblog.sid',
  store: RedisStore({
    host: config.redis.host,
    port: config.redis.port,
    auth_pass: config.redis.password || ''
  }),
  cookie: config.session.cookie
}))
app.use(router.routes())
app.listen(3000)

console.log('server run')



