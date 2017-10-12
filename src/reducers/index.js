import { combineReducers } from 'redux'

import { SELECT_STATUS, REQUEST_SCHOOLS, RECEIVE_SCHOOLS, USER_LOGGED_IN, USER_LOGGING_IN, USER_LOGGED_OUT } from '../actions'

const selectedStatus = (state = 'All', action) => {
    switch (action.type) {
        case SELECT_STATUS:
            return action.status
        default:
            return state
    }
}

const schools = (state = {
    isFetching: false,
    items: {}
}, action) => {
    switch (action.type) {
        case REQUEST_SCHOOLS:
            return {
                ...state,
                isFetching: true
            }
        case RECEIVE_SCHOOLS:
            return {
                ...state,
                isFetching: false,
                items: action.schools
            }
        default:
            return state
    }
}

const schoolsByStatus = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_SCHOOLS:
        case REQUEST_SCHOOLS:
            return {
                ...state,
                [action.status]: schools(state[action.status], action)
            }
        default:
            return state
    }
}

const userinitialState = {
    token: null,
    profile:null,
    isLoading: false
  }
  
  export  function currentUser(state = userinitialState,action) {
    switch (action.type) {
      case USER_LOGGING_IN:
        return { ...userinitialState, isLoading: true }
      case USER_LOGGED_IN:
        return { token: action.token,profile:action.profile, isLoading: false }
      case USER_LOGGED_OUT:
        return userinitialState
      default:
        return state
    }
  }

const rootReducer = combineReducers({ schoolsByStatus, selectedStatus, currentUser })

export default rootReducer
