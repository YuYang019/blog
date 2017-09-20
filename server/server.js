/**
 * Created by maoyuyang on 17/8/8.
 */
//process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const router = require('./router')
const cors = require('koa-cors')
const mongoose = require('./connect')

const app = new Koa()

app.use(bodyParser())
app.use(cors())
app.use(router.routes())
app.listen(3000)

console.log('server run')



