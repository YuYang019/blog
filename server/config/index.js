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
            maxAge: 365*24*60*60,
            domain: '127.0.0.1'
        }
    },
    redis: {
        host: process.env.REDIS_PORT_6379_TCP_ADDR || '127.0.0.1',
        port: process.env.REDIS_PORT_6379_TCP_PORT || 6379,
        password: process.env.REDIS_PASSWORD || ''
    },
    github: {
        client_id: 'c7135215e7e216f4f4e6',
        client_secret: '895a05c2a76f4666bcd37654ff0f993be0c2aa47'
    }
}

module.exports = config