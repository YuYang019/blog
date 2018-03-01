/**
 * Created by maoyuyang on 17/9/7.
 */
import api from '../../api/index'
import {
    ARTICLE_DETAIL,
    TOGGLE_LIKE
} from '../mutation-types'

const state = {
    item: ''
}

const actions = {
    getArticleDetail ({ commit }, options) {
        let user = options.user
        let id = options.aid
        api.getFrontArticleDetail(id).then(response => {
            if (response.status === 200) {
                let isLike = false
                let article = response.data.data

                if (user) {
                    user.likes.map(item => {
                        if (item.toString() === article._id) {
                            isLike = true
                        }
                    })
                }
                commit(ARTICLE_DETAIL, {
                    articleDetail: {...article, isLike: isLike}
                })
            }
        })
    },
    toggleLike(store, id) {
        api.toggleLike(id).then(response => {
            const json = response.data
            if (response.status === 200) {
                store.commit(TOGGLE_LIKE, {
                    like_count: json.count,
                    isLike: json.isLike
                })
                // 只有返回不喜欢该文章时，才会删除user的likes里的该文章id，否则增添
                if (!json.isLike) {
                    store.dispatch('delUserLikes', id)
                } else {
                    store.dispatch('addUserLikes', id)
                }
            }
        })
    }
}

const mutations = {
    [ARTICLE_DETAIL] (state, action) {
        state.item = {...state.item, ...action.articleDetail}
    },
    [TOGGLE_LIKE] (state, action) {
        state.item = { ...state.item, isLike: action.isLike, like_count: action.like_count }
    }
}

export default {
    state,
    actions,
    mutations
}
