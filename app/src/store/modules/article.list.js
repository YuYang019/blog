/**
 * Created by maoyuyang on 17/9/7.
 */
import api from '../../api'
import {
  ARTICLE_LIST,
  REQUEST_ARTICLE_LIST,
  // CHANGE_PAGE,
  GET_ARTICLE_LIST_FAILURE
} from '../mutation-types'

let state = {
  isFetching: false,
  items: [],
  total: 1,
}

const actions = {
  getArticleList({
    commit
  }, {
    options
  }) {
    commit(REQUEST_ARTICLE_LIST)
    api.getFrontArticleList(options).then(response => {
      if (response.status !== 200) {
        return commit(GET_ARTICLE_LIST_FAILURE)
      }
      const json = response.data
      // console.log(json)
      commit(ARTICLE_LIST, {
        items: json.data,
        total: json.total
      })
    }).catch(err => {
      commit(GET_ARTICLE_LIST_FAILURE)
    })
  }
}

const mutations = {
  // [CHANGE_PAGE] (state, action) {
  //     state.currentPage = action.currentPage
  // },
  [ARTICLE_LIST](state, action) {
    state.isFetching = false
    state.items = action.items
    state.total = action.total
  },
  [REQUEST_ARTICLE_LIST](state) {
    state.isFetching = true
  },
  [GET_ARTICLE_LIST_FAILURE](state) {
    state.isFetching = false
  }
}

export default {
  state,
  actions,
  mutations
}
