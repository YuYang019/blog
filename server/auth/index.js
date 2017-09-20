/**
 * Created by maoyuyang on 17/9/3.
 */
const mongoose = requir('mongoose')
const User = mongoose.model('User')
const config = require('../config')

require('./local/passport').setup(User, config)