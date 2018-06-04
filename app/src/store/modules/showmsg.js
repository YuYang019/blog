/**
 * Created by maoyuyang on 17/8/29.
 */
import {
  SHOW_MSG
} from '../mutation-types'

const state = {
  message: {
    type: '',
    content: ''
  }
}

const mutations = {
  [SHOW_MSG](state, action) {
    // 对象展开运算符
    state.message = { ...action
    }
  }
}

export default {
  state,
  mutations
}
