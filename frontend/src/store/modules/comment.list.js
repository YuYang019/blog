/**
 * Created by maoyuyang on 17/9/7.
 */
import api from '../../api/index'
import { showMsg } from '../actions'
import {
    COMMENT_LIST,
    //SUCCESS_ADD_COMMENT,
    SUCCESS_ADD_REPLAY,
    GET_COMMENT_LIST_FAILURE
} from '../mutation-types'

let state = {
    isFetching: false,
    items: ''
}

const actions = {
    getCommentList({ commit }, id) {
        api.getFrontCommentList(id).then(response => {
            if (response.status !== 200) {
                return commit(GET_COMMENT_LIST_FAILURE)
            }
            commit(COMMENT_LIST, { commentList: response.data.data })
        }).catch(err => {
          commit(GET_COMMENT_LIST_FAILURE)
        })
    },
    addComment(store, data) {
        api.addNewComment(data).then(response => {
            if (response.status !== 200) {
                return showMsg(store, response.data.error_msg || '添加评论失败')
            }
            showMsg(store, '添加评论成功', 'success')
            //store.commit(SUCCESS_ADD_COMMENT, { comment: response.data.data })
            store.dispatch('getCommentList', response.data.data.articleId)
        }).catch(err => {
            showMsg(store, err.response.data.error_msg || '添加评论失败')
        })

    },
    replyComment(store, { cid, aid, uid, data }) {
        api.addNewReply(cid, aid, uid, data).then(response => {
            if (response.status !== 200) {
                return showMsg(store, response.data.error_msg || '回复失败')
            }
            showMsg(store, '回复成功', 'success')
            //store.commit(SUCCESS_ADD_REPLAY, { cid: cid, replys: response.data.data })
            store.dispatch('getCommentList', response.data.aid )
        }).catch(err => {
            showMsg(store, err.response.data.error_msg || '回复失败')
        })
    }
}

const mutations = {
    [COMMENT_LIST] (state, action) {
        state.items = action.commentList
    },
    [GET_COMMENT_LIST_FAILURE] (state) {
        state.items = []
        state.isFetching = false
    },
    // [SUCCESS_ADD_COMMENT] (state, action) {
    //     state.items.push(action.comment)
    // },
    [SUCCESS_ADD_REPLAY] (state, action) {
        state.items = state.items.map(item => {
            if (item._id === action.cid) {
                item.replys = action.replys
            }
            return item
        })
    }
}

export default {
    state,
    actions,
    mutations
}
