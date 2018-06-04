/**
 * Created by maoyuyang on 17/9/10.
 */
import api from '../../api/index'
import {
  showMsg
} from '../actions'
import options from './options'
import {
  ADD_ARTICLE,
  ADD_ARTICLE_FAILURE,
  ADD_ARTICLE_SUCCESS,
  HIDE_PUBLISH_DIALOG
} from '../mutation-types'

let state = {
  isLoading: false
}

const actions = {
  addArticle(store, data) {
    store.commit(ADD_ARTICLE)
    api.addArticle(data).then(response => {
      if (response.status !== 200) {
        store.commit(ADD_ARTICLE_FAILURE)
        showMsg(store, response.data.error_msg, 'error')
      }
      store.commit(ADD_ARTICLE_SUCCESS)
      // 重新拉取数据
      store.dispatch('getArticleList', {
        options: options.state.item
      })
      showMsg(store, '发布成功', 'success')
      setTimeout(() => {
        // 隐藏publish的模态框
        store.commit(HIDE_PUBLISH_DIALOG)
      }, 1500)
    }).catch(err => {
      store.commit(ADD_ARTICLE_FAILURE)
      showMsg(store, err.response.data.error_msg, 'error')
    })
  }
}

const mutations = {
  [ADD_ARTICLE](state) {
    state.isLoading = true
  },
  [ADD_ARTICLE_FAILURE](state) {
    state.isLoading = false
  },
  [ADD_ARTICLE_SUCCESS](state) {
    state.isLoading = false
  }
}

export default {
  state,
  actions,
  mutations
}
