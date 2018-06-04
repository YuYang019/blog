/**
 * Created by maoyuyang on 17/9/14.
 */
import api from '../../api/index'
import {
  showMsg
} from '../actions'
import {
  GET_CONVERSATION,
  GET_CONVERSATION_SUCCESS,
  SHOW_CONVER_DIALOG
} from '../mutation-types'

let state = {
  isFetching: false,
  item: []
}

const actions = {
  getConversation(store, cid) {
    store.commit(GET_CONVERSATION)
    api.getConversation(cid).then(response => {
      console.log(response.data.data.content)
      if (response.status === 200) {
        store.commit(GET_CONVERSATION_SUCCESS, {
          conversation: response.data.data.content
        })
        store.commit(SHOW_CONVER_DIALOG)
      }
    }).catch(err => {
      showMsg(store, '获取会话失败', 'error')
    })
  }
}

const mutations = {
  [GET_CONVERSATION](state) {
    state.isFetching = true
  },
  [GET_CONVERSATION_SUCCESS](state, action) {
    state.isFetching = false
    state.item = action.conversation
  }
}

export default {
  state,
  actions,
  mutations
}
