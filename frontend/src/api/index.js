import axios from 'axios'
import { API_ROOT } from '../config.js'
import { getCookie, signOut, isLogin } from '../utils/authService'

axios.interceptors.request.use(function (config) {
    if (isLogin()) {
        config.headers.Authorization = 'Bearer ' + getCookie('token')
    }
    return config
})

axios.interceptors.response.use(function (response) {
    if (response.status === 401) {
        signOut()
    }
    return response
})

export default {
    login (data) {
        return axios.post(API_ROOT + '/api/user/login', data)
    },
    getMe () {
        return axios.get(API_ROOT + '/api/user/me')
    }
}