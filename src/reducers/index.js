import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading-bar'
import constants from '../constants'

const selectedStatus = (state = 'All', action) => {
    switch (action.type) {
        case constants.SELECT_STATUS:
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
        case constants.REQUEST_SCHOOLS:
            return {
                ...state,
                isFetching: true
            }
        case constants.RECEIVE_SCHOOLS:
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
        case constants.RECEIVE_SCHOOLS:
        case constants.REQUEST_SCHOOLS:
            return {
                ...state,
                [action.status]: schools(state[action.status], action)
            }
        default:
            return state
    }
}

const userinitialState = {
    profile: null,
    isLoading: false,
    error: null
}

export function currentUser(state = userinitialState, action) {
    switch (action.type) {
        case constants.USER_LOGGING_IN:
            return { ...userinitialState, isLoading: true }
        case constants.USER_LOGIN_ERROR:
            return { ...userinitialState, error: action.error }
        case constants.USER_LOGGED_IN:
            return { profile: action.profile, isLoading: false, error: null }
        case constants.USER_LOGGED_OUT:
            return userinitialState
        default:
            return state
    }
}

export const subTitle = (state = "", action) => {
    switch (action.type) {
        case constants.SET_NAV_SUBTITLE:
            return action.subtitle
        default:
            return state
    }
}

const rootReducer = combineReducers({ schoolsByStatus, selectedStatus, currentUser, subTitle, loadingBar: loadingBarReducer })

export default rootReducer
