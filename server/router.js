/**
 * Created by maoyuyang on 17/8/9.
 */
const Router  = require('koa-router')
const userctrl = require('./controllers/users/userctrl')
const articlectrl = require('./controllers/articles/articlectrl')
const commentctrl = require('./controllers/comment/commentctrl')
const snsctrl = require('./controllers/sns/snsctrl')
const auth = require('./auth/auth')

const router = new Router()

// 注意：加了auth.isAuthenticated()的，如果认证成功，可在后续操作中，通过ctx.req.user访问用户信息

router
    // 用户
    .get('/api/user/me', auth.isAuthenticated(), userctrl.getMe)
    .post('/api/user/login', userctrl.login)
    .post('/api/user/register', userctrl.register)
    .get('/api/user/captcha', userctrl.getCaptcha)

    // 文章
    .get('/api/article/list', articlectrl.getFrontArticleList)
    .post('/api/article/add', auth.isAuthenticated(), articlectrl.addArticle)
    .get('/api/article/detail', articlectrl.getArticleDetail)
    .put('/api/article/like', auth.isAuthenticated(), articlectrl.toggleLike)
    .get('/api/article/prenext', articlectrl.getPrenext)

    // 评论
    .get('/api/comment/list', commentctrl.getFrontCommentList)
    .post('/api/comment', auth.isAuthenticated(), commentctrl.addNewComment)
    //.delete('/api/comment', auth.isAuthenticated(), commentctrl.delComment)
    .post('/api/comment/reply', auth.isAuthenticated(), commentctrl.addNewReply)
    //.delete('/api/comment/reply', auth.isAuthenticated(), commentctrl.delReply)
    .get('/api/comment/conversation', commentctrl.getConversation)

    // github
    .get('/github/oauth/login', snsctrl.githubLogin)
    .get('/github/oauth/callback', snsctrl.githubCallback)

    .get('/', async (ctx, next) => {
        ctx.body = 'hello world'
    })

module.exports = router