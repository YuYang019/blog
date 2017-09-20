/**
 * Created by maoyuyang on 17/9/3.
 */
const path = require('path')
const fs = require('fs')
const mongoose = require('mongoose')
const config = require('./config')

mongoose.connect(config.mongo.uri)

//const modelsPath = path.join(__dirname, 'model')

// 依次引入model
// fs.readdirSync(modelsPath).forEach(function (file) {
//     if (/(.*)\.js$/.test(file)) {
//         require(modelsPath + '/' + file)
//     }
// })

mongoose.Promise = global.Promise

module.exports = mongoose