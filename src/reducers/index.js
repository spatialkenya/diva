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

const userInitialState = {
    data: null,
    isLoading: false
}

const user = (state = userInitialState, action) => {
    switch (action.type) {
        case USER_LOGGING_IN:
            return { ...userInitialState, isLoading: true }
        case USER_LOGGED_IN:
            return { data: action.payload, isLoading: false }
        case USER_LOGGED_OUT:
            return userInitialState
        default:
            return state
    }
}

const rootReducer = combineReducers({ schoolsByStatus, selectedStatus, user })

export default rootReducer
