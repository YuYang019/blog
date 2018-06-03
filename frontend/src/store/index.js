/**
 * Created by maoyuyang on 17/8/27.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import showmsg from './modules/showmsg'
import showdialog from './modules/showdialog'
import articleList from './modules/article.list'
import articleAdd from './modules/article.add'
import articleDetail from './modules/artile.detail'
import articlePrenext from './modules/article.prenext'
import commentList from './modules/comment.list'
import conversation from './modules/comment.conversation'
import options from './modules/options'
import * as actions from './actions'
import createLogger from 'vuex/dist/logger'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)

export default new Vuex.Store({
    actions,
    //getters,
    modules: {
        user,
        showmsg,
        showdialog,
        articleList,
        articleAdd,
        articleDetail,
        articlePrenext,
        commentList,
        conversation,
        options
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})