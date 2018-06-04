/**
 * Created by maoyuyang on 17/9/7.
 */
import api from '../../api'
import {
  ARTICLE_PRENEXT
} from '../mutation-types'

const state = {
  next: {},
  prev: {}
}

const actions = {
  getPrenext({
    commit,
    rootState
  }, aid) {
    // console.log(rootState)
    api.getPrenext(aid).then(response => {
      if (response.status === 200) {
        commit(ARTICLE_PRENEXT, response.data.data)
      }
    })
  }
}

const mutations = {
  [ARTICLE_PRENEXT](state, action) {
    state.next = action.next
    state.prev = action.prev
  }
}

export default {
  state,
  actions,
  mutations
}
