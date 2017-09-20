/**
 * Created by maoyuyang on 17/8/30.
 */
var config = {
    mongo: {
        uri: 'mongodb://localhost/user'
    },
    session: {
        secrets: 'maoyuyang',
        cookie: {
            maxAge: 365*24*60*60
        }
    }
}

module.exports = config