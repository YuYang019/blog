//import api from '../api'
import * as types from './mutation-types'

export const showMsg = ({ commit }, content, type='error') => {
    commit(types.SHOW_MSG, { content: content, type: type })
}