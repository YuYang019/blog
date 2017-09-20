/**
 * Created by maoyuyang on 17/9/13.
 */
const Comment = require('../../model/comment.model')
const xss = require('xss')
const Article = require('../../model/article.model')
const Conversation  = require('../../model/conversation.model')

exports.getFrontCommentList = async (ctx, next) => {
    const id = ctx.query.id
    try {
        const commentList = await Comment.find({ aid: id, status: { $eq: 1 } })
            .sort('created')
            // 用于通过外键与另一张表建立关联
            .populate([
                {
                    // 指定填充的关联字段
                    path: 'user_id',
                    // 选择填充文档的字段
                    select: 'username avatar',
                    // 指定附加查询条件
                    match: { username: { $exists: true } }
                },
                {
                    path: 'inReplyToUser',
                    select: 'username avatar',
                    match: { username: { $exists: true } }
                }
            ])
            .exec()

        ctx.status = 200
        ctx.body = { data: commentList }
    } catch (err) {
        ctx.throw(err)
    }
}

exports.addNewComment = async (ctx, next) => {
    const aid = ctx.request.body.aid
    let content = ctx.request.body.content
    const userId = ctx.req.user._id
    let error_msg
    if (!aid) {
        error_msg = '缺少必要参数'
    } else if (!content || content === '') {
        error_msg = '评论不能为空'
    }
    if (error_msg) {
        ctx.status = 422
        return ctx.body = { error_msg: error_msg }
    }
    content = xss(content)

    try {
        // 增添一条评论
        let result = await Comment.create({ aid: aid, content: content, user_id: userId })
        // console.log(result)
        // 返回的结果是包装过的对象，需要转换一下
        // let comment = result.toObject()
        // comment.user_id = {
        //     _id: ctx.req.user._id,
        //     nickname: ctx.req.user.nickname,
        //     avatar: ctx.req.user.avatar
        // }
        // 给文章的评论数加一
        await Article.findByIdAndUpdate(aid, { $inc: { comment_count: 1 } }).exec()
        ctx.status = 200
        ctx.body = {
            success: true,
            data: {
                commentId: result._id,
                articleId: aid
            }
        }
    } catch (err) {
        ctx.throw(err)
    }
}

exports.addNewReply = async (ctx, next) => {
    // 文章id
    const aid = ctx.request.body.aid
    // 回复所在评论的id
    const cid = ctx.request.body.cid
    // 回复目标的用户id
    const rid = ctx.request.body.uid
    // 进行回复的用户id
    const uid = ctx.req.user._id

    let content = ctx.request.body.data

    let error_msg

    if (!aid || !cid) {
        error_msg = '缺少必要参数'
    }
    if (!content) {
        error_msg = '内容不能为空'
    }
    if (error_msg) {
        ctx.status = 422
        return ctx.body = {
            error_msg: error_msg
        }
    }

    content = xss(content)

    try {
        const comment = await Comment.findById(cid)

        if (!comment.conversation_id) {
            // 如果没有会话id，则创建一个会话文档，加入回复所在评论的id
            var conversation = await Conversation.create({
                content: cid
            })
        }

        const conver_id = comment.conversation_id || conversation._id

        // 创建一个包含回复目标id和会话id的评论，用于区分普通评论和回复评论
        const reply = await Comment.create({
            aid: aid,
            user_id: uid,
            content: content,
            inReplyToUser: rid,
            conversation_id: conver_id
        })

        // 再往会话中添加新创建的评论id
        await Conversation.findByIdAndUpdate(conver_id, {
            // 可以防止重复添加
            '$addToSet': {
                'content': reply._id
            },
        })

        ctx.status = 200
        ctx.body = {
            success: 'true',
            // 用于评论成功后，获取评论列表
            aid: aid
        }
    } catch (err) {
        ctx.throw(err)
    }
}

exports.getConversation = async (ctx, next) => {
    const cid = ctx.query.id
    let error_msg

    if(!cid) {
        error_msg = '缺少必要参数'
    }
    if (error_msg) {
        ctx.status = 422
        return ctx.body = {
            error_msg: error_msg
        }
    }

    try {
        // 通过评论id找到会话id
        const conver = await Comment.findById(cid).select('conversation_id').exec()

        // 通过会话id找到该会话包含评论id的数组，populate太强大了，直接把数组里的id转成评论对象了
        const result = await Conversation.findById(conver.conversation_id)
            .populate({
                path: 'content',
                // 填充子字段
                populate: [{
                    path: 'user_id',
                    // 选择填充文档的字段
                    select: 'username avatar',
                    // 指定附加查询条件
                    match: { username: { $exists: true } }
                }, {
                    path: 'inReplyToUser',
                    select: 'username avatar',
                    match: { username: { $exists: true } }
                }]
            })
            .sort('created')
            .exec()

        ctx.status = 200
        ctx.body = {
            data: result
        }

    } catch (err) {
        ctx.throw(err)
    }
}