/**
 * Created by maoyuyang on 17/8/27.
 */
import api from '../../api/index'
import { showMsg } from '../actions'
import { getCookie, saveCookie, signOut } from '../../utils/authService'
import {
    LOGIN_SUCCESS,
    USERINFO_SUCCESS,
    USERINFO_FAILURE,
    LOGOUT_USER,
    UPDATE_USER_SUCCESS
} from '../mutation-types'

const state = {
    token: getCookie('token') || null,
    user: null
}

// getters
// const getters = {
//     getLoginState: state => state.isLogin
// }

// actions
const actions = {
    logout (store) {
        signOut()
        store.commit(LOGOUT_USER)
        showMsg(store, '退出成功', 'success')
    },
    login (store, userInfo) {
        console.log(userInfo)
        api.login(userInfo)
            .then(response => {
                if (!(response.status === 200)) {
                    return showMsg(store, '登录失败')
                }
                const token = response.data.token
                //console.log(token)
                saveCookie('token', token)
                store.dispatch('getUserInfo')
                store.commit(LOGIN_SUCCESS, { token: token })
                showMsg(store, '登录成功，欢迎！', 'success')
            })
            .catch(error => {
                showMsg(store, '登录失败！', 'error')
            })
    },
    getUserInfo ({ commit }) {
        //console.log('userinfo')
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
    }
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
        state.token = getCookie('token') || null
        state.user = null
        state.token = null
    }
}

export default {
    state,
    actions,
    mutations
}

