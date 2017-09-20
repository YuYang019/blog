/**
 * Created by maoyuyang on 17/9/9.
 */
import { CHANGE_OPTIONS } from '../mutation-types'

const state = {
    item: {
        currentPage: 1,
        itemsPerPage: 10,
        sortName: 'publish_time'
    }
}

const actions = {
    changeOptions({ commit }, options) {
        commit(CHANGE_OPTIONS, { options: options })
    }
}

const mutations = {
    [CHANGE_OPTIONS] (state, action) {
        state.item = {...state.item, ...action.options}
    }
}

export default {
    state,
    actions,
    mutations
}