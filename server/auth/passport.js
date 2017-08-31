/**
 * Created by maoyuyang on 17/8/31.
 */
const passport = require('koa-passport')
const LocalStrategy = require('passport-local').Strategy

exports.setup = function (User, config) {
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    async  (username, password, done) => {
        try {
            const user = await User.findOne({ username: username })
            if (!user) {
                return done(null, false, { error_msg: '用户名或密码错误' })
            }
            if (!user.authenticate(password)) {
                return done(null, false, { error_msg: '用户名或密码错误' })
            }
            return done(null, user)
        } catch (err) {
            return done(err)
        }
    }
    ))
}