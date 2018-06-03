/**
 * Created by maoyuyang on 17/8/27.
 */
import api from '../../api/index'
import { API_ROOT } from '../../config'
import { showMsg } from '../actions'
import { getCookie, saveCookie, signOut } from '../../utils/authService'
import {
    LOGIN_SUCCESS,
    USERINFO_SUCCESS,
    USERINFO_FAILURE,
    LOGOUT_USER,
    ADD_USER_LIKES,
    DEL_USER_LIKES,
    HIDE_LOGIN_DIALOG,
    HIDE_REGISTER_DIALOG,
    GET_CAPTCHA
} from '../mutation-types'
import dialog from './showdialog'

const state = {
    token: getCookie('token') || null, // 让初始化的时候能够获取本地cookie
    user: null,
    captchaUrl: ''
}

const actions = {
    logout (store) {
        signOut()
        store.commit(LOGOUT_USER)
        showMsg(store, '退出成功', 'success')
    },
    login (store, userInfo) {
        //console.log(userInfo)
        api.login(userInfo)
            .then(response => {
                if (response.status !== 200) {
                    return showMsg(store, response.error_msg)
                }
                // 登录成功返回token
                const token = response.data.token
                // 存入cookie
                saveCookie('token', token)
                // 获取个人信息
                store.dispatch('getUserInfo')
                // 登录成功，将token存入state
                store.commit(LOGIN_SUCCESS, { token: token })
                // 关闭登录框
                store.commit(HIDE_LOGIN_DIALOG)
                // 成功消息
                showMsg(store, '登录成功，欢迎！', 'success')
            })
            .catch(err => {
                let response = err.response
                showMsg(store, response.data.error_msg, 'error')
            })
    },
    delUserLikes ({ commit }, aid) {
        commit(DEL_USER_LIKES, { aid: aid })
    },
    addUserLikes ({ commit }, aid) {
        commit(ADD_USER_LIKES, { aid: aid })
    },
    getUserInfo ({ commit }) {
        api.getMe()
            .then(response => {
                if(!(response.status === 200)) {
                    return commit(USERINFO_FAILURE)
                }
                commit(USERINFO_SUCCESS, { user: response.data })
            })
            .catch(error => {
                commit(USERINFO_FAILURE)
            })
    },
    register (store, userInfo) {
        console.log(userInfo)
        api.register(userInfo)
            .then(response => {
                if (response.status !== 200) {
                    return showMsg(store, response.error_msg)
                }
                showMsg(store, '注册成功，2秒后将自动登录', 'success')

                setTimeout(() => {
                    store.dispatch('login', userInfo)
                    // 关闭登录框
                    store.commit(HIDE_REGISTER_DIALOG)
                }, 2000)
            })
            .catch(err => {
                let response = err.response
                showMsg(store, response.data.error_msg, 'error')
            })
    },
}

const mutations = {
    [LOGIN_SUCCESS] (state, action) {
        state.token = action.token
    },
    [USERINFO_SUCCESS] (state, action) {
        state.user = action.user
    },
    [USERINFO_FAILURE] (state, action) {
        state.user = null
    },
    [LOGOUT_USER] (state, action) {
        // state.token = getCookie('token') || null
        console.log(dialog.state.showLogin)
        state.user = null
        state.token = null
    },
    // 删除user的likes里的文章id
    [DEL_USER_LIKES] (state, action) {
        let aid = action.aid
        let user = state.user
        if (user) {
            let index = user.likes.indexOf(aid)
            if (index !== -1) {
                user.likes.splice(index, 1)
                console.log(user)
            }
        }
    },
    // 增添likes里的id
    [ADD_USER_LIKES] (state, action) {
        let aid = action.aid
        let user = state.user
        if (user) {
            let index = user.likes.indexOf(aid)
            if (index === -1) {
                console.log(aid)
                user.likes.push(aid)
                console.log(user)
            }
        }
    },
    // captcha
    [GET_CAPTCHA] (state, action) {
        state.captchaUrl = `${API_ROOT}/api/user/captcha?${Math.random()}`
    }
}

export default {
    state,
    actions,
    mutations
}

