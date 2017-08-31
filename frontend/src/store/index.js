/**
 * Created by maoyuyang on 17/8/27.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import showmsg from './modules/showmsg'
import * as actions from './actions'
import createLogger from 'vuex/dist/logger'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)

export default new Vuex.Store({
    actions,
    //getters,
    modules: {
        auth,
        showmsg,
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})