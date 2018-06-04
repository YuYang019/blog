/**
 * Created by maoyuyang on 17/9/5.
 */
import {
  SHOW_LOGIN_DIALOG,
  HIDE_LOGIN_DIALOG,
  SHOW_REGISTER_DIALOG,
  HIDE_REGISTER_DIALOG,
  SHOW_PUBLISH_DIALOG,
  HIDE_PUBLISH_DIALOG,
  SHOW_CONVER_DIALOG,
  HIDE_CONVER_DIALOG
} from '../mutation-types'

let state = {
  showLogin: false,
  showRegister: false,
  showPublish: false,
  showConversation: false
}

const mutations = {
  [SHOW_LOGIN_DIALOG](state) {
    state.showLogin = true
  },
  [HIDE_LOGIN_DIALOG](state) {
    state.showLogin = false
  },
  [SHOW_REGISTER_DIALOG](state) {
    state.showRegister = true
  },
  [HIDE_REGISTER_DIALOG](state) {
    state.showRegister = false
  },
  [SHOW_PUBLISH_DIALOG](state) {
    state.showPublish = true
  },
  [HIDE_PUBLISH_DIALOG](state) {
    state.showPublish = false
  },
  [SHOW_CONVER_DIALOG](state) {
    state.showConversation = true
  },
  [HIDE_CONVER_DIALOG](state) {
    state.showConversation = false
  }
}

export default {
  state,
  mutations
}
