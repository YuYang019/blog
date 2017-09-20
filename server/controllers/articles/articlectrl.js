/**
 * Created by maoyuyang on 17/9/9.
 */
const Article = require('../../model/article.model')
const User = require('../../model/user.model')
const _ = require('lodash')
const mongoose = require('mongoose')

exports.getFrontArticleList = async (ctx, next) => {
    let currentPage = (parseInt(ctx.query.currentPage) > 0) ? parseInt(ctx.query.currentPage) : 1
    let itemsPerPage = (parseInt(ctx.query.itemsPerPage) > 0) ? parseInt(ctx.query.itemsPerPage) : 10
    let startRow = (currentPage - 1) * itemsPerPage
    let sort = String(ctx.query.sortName) || 'publish_time'

    sort = '-' + sort

    // 条件查询
    // $lt 小于 less
    // $lte 小于等于 less equal
    // $gt 大于 greater
    // $gte 大于等于 greater equal
    // $ne 不等于 not equal
    let condition = {
        status: {
            $gte: 0
        }
    }

    try {
        const list = await Article.find(condition)
            // 排序 键对应文档的键名, '-publish_time'表示依据pushlish_time降序
            .sort(sort)
            .select('author title images visit_count comment_count like_count publish_time')
            // 跳过前startRow个文档，返回其余的
            .skip(startRow)
            // 限制返回结果的数量
            .limit(itemsPerPage)
            // 填充字段
            .populate({
                path: 'author',
                select: 'username avatar',
                // 指定附加查询条件
                match: { username: { $exists: true } }
            })
            .exec()

        let count = await Article.count(condition)

        ctx.status = 200
        ctx.body = {
            total: count,
            data: list
        }
    } catch (e) {
        ctx.throw(e)
    }
}

exports.addArticle = async (ctx, next) => {
    const content = ctx.request.body.content
    const title = ctx.request.body.title
    let err_msg
    if (!title) {
        err_msg = '标题不能为空'
    } else if (!content) {
        err_msg = '内容不能为空'
    }
    if (err_msg) {
        ctx.status = 422
        return ctx.body = {
            err_msg: err_msg
        }
    }
    try {
        console.log(ctx.req.user.userInfo)
        // 将author信息加入
        const obj = {
            title: ctx.request.body.title,
            content: ctx.request.body.content,
            author: ctx.req.user._id
        }
        let article = await Article.findOne({ title: obj.title })
        if (article) {
            ctx.status = 403
            return ctx.body = { error_msg: '文章标题不可重复' }
        }
        // 存入文章表中
        const result = await Article.create(obj)
        ctx.status = 200
        ctx.body = {
            success: true,
            article_id: result._id
        }
    } catch (err) {
        ctx.throw(err)
    }
}

exports.getArticleDetail = async (ctx, next) => {
    const id = ctx.query.id
    try {
        const article = await Article.findOne( { _id: id })
            .populate({
                path: 'author',
                select: 'username avatar',
                match: { username: { $exists: true } }
            })
            .exec()

        ctx.status = 200
        ctx.body = {
            data: article
        }
    } catch (err) {
        ctx.throw(err)
    }
}

exports.toggleLike = async (ctx, next) => {
    //const _ctx = ctx
    const aid = new mongoose.Types.ObjectId(ctx.request.body.id)
    const userId = ctx.req.user._id

    //const isLike = _.indexOf(ctx.req.user.likeList, ctx.request.body.id.toString())

    // 判断文章id是否在喜欢列表里
    const isLike = ctx.req.user.likeList.indexOf(ctx.request.body.id)

    console.log(isLike)

    let conditionOne, conditionTwo, liked
    if (isLike !== -1) {
        conditionOne = {
            // 删除
            '$pull': {
                'likeList': aid
            }
        }
        conditionTwo = {
            // 增减修改器,只对数字有效.
            '$inc': {
                'like_count': -1
            }
        }
        liked = false
    } else {
        conditionOne = {
            // 向数组中添加一个元素,如果存在就不添加
            '$addToSet': {
                'likeList': aid
            }
        }
        conditionTwo = {
            '$inc': {
                'like_count': 1
            }
        }
        liked = true
    }

    try {
        const user = await User.findByIdAndUpdate(userId, conditionOne)
        const article = await Article.findByIdAndUpdate(aid, conditionTwo, {
            // 表示返回更新后的数据
            new: true
        })
        ctx.status = 200
        ctx.body = {
            success: true,
            'count': article.like_count,
            'isLike': liked
        }
    } catch (err) {
        ctx.throw(err)
    }
}

exports.getPrenext = async (ctx, next) => {
    const aid = ctx.query.id
    console.log(aid)
    const sort = 'publish_time'
    try {
        const article = await Article.findById(aid)
        console.log(article)
        // 查询当前文章之前的文章的条件
        const preCondition = {
            'status': {
                $gte: 0
            },
            '_id': {
                $ne: aid
            },
            'publish_time': {
                // 小于等于
                $lte: article.publish_time
            }
        }
        // 查询当前文章之后的文章
        const nextCondition = {
            'status': {
                $gte: 0
            },
            '_id': {
                $ne: aid
            },
            'publish_time': {
                $gte: article.publish_time
            }
        }
        // sort 从大到小
        const preResult = await Article.find(preCondition).select('title').limit(1).sort('-' + sort)
        // sort 从小到大
        const nextResult = await Article.find(nextCondition).select('title').limit(1).sort(sort)

        const prev = preResult[0] || {}
        const next = nextResult[0] || {}

        ctx.status = 200
        ctx.body = {
            data: {
                prev: prev,
                next: next
            }
        }
    } catch (err) {
        ctx.throw(err)
    }
}
