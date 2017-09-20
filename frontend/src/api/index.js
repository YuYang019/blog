import axios from 'axios'
import { API_ROOT } from '../config.js'
import { getCookie, signOut, isLogin } from '../utils/authService'

// 拦截器，给每个请求加上token
axios.interceptors.request.use(function (config) {
    if (isLogin()) {
        config.headers.Authorization = 'Bearer ' + getCookie('token')
    }
    return config
})

// 对每个返回的请求，如果为401，登出
axios.interceptors.response.use(function (response) {
    if (response.status === 401) {
        signOut()
    }
    return response
})

export default {
    // 用户
    login (data) {
        return axios.post(API_ROOT + '/api/user/login', data)
    },
    getMe () {
        return axios.get(API_ROOT + '/api/user/me')
    },
    register (data) {
        return axios.post(API_ROOT + '/api/user/register', data)
    },
    // 文章
    getFrontArticleList (options) {
        //console.log(options)
        return axios.get(API_ROOT + '/api/article/list', {
            params: options
        })
    },
    getFrontArticleDetail (id) {
        return axios.get(API_ROOT + '/api/article/detail', {
            params: {
                id: id
            }
        })
    },
    addArticle (data) {
        return axios.post(API_ROOT + '/api/article/add', data)
    },
    toggleLike (id) {
        return axios.put(API_ROOT + '/api/article/like', { id: id })
    },
    getPrenext (id) {
        return axios.get(API_ROOT + '/api/article/prenext', {
            params: {
                id: id
            }
        })
    },
    // 评论
    getFrontCommentList (id) {
        return axios.get(API_ROOT + '/api/comment/list', {
            params: {
                id: id
            }
        })
    },
    addNewComment (data) {
        return axios.post(API_ROOT  + '/api/comment', data)
    },
    addNewReply (cid, aid, uid, data) {
        return axios.post(API_ROOT + '/api/comment/reply', {
            cid: cid,
            aid: aid,
            uid: uid,
            data: data
        })
    },
    delComment:function (id) {
        return axios.delete(API_ROOT  + '/api/comment', { id: id })
    },
    delReply: function (id,data) {
        return axios.delete(API_ROOT + '/api/comment/reply', {
            id: id,
            data: data
        })
    },
    getConversation (id) {
        return axios.get(API_ROOT + '/api/comment/conversation', {
            params: {
                id: id
            }
        })
    }
}