import axios from 'axios'
import { setToken } from './actions'
import { URL, LOGIN } from './config/Api'
import store from './store';

import { USER_LOGGED_IN, USER_LOGGING_IN, USER_LOGGED_OUT } from './actions'

import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper'

import Loading from './components/Loading'


export const login = (username, password) => {
    store.dispatch({
        type: USER_LOGGING_IN
    })
    // Wait 2 seconds before "logging in"
    return axios
        .post(URL + LOGIN, {
            username,
            password
        })
        .then(function (response) {
            store.dispatch(setToken(response.data.token));
            store.dispatch({
                type: USER_LOGGED_IN,
                payload: response.data.token
            })


        })
        .catch(function (error) {
            alert("Failed to fetch:", error)
        });
}

export function logout() {
    store.dispatch({ type: USER_LOGGED_OUT })
}


const locationHelper = locationHelperBuilder({})

const userIsAuthenticatedDefaults = {
    authenticatedSelector: state => state.user.data !== null,
    authenticatingSelector: state => state.user.isLoading,
    wrapperDisplayName: 'UserIsAuthenticated'
}

export const userIsAuthenticated = connectedAuthWrapper(userIsAuthenticatedDefaults)

export const userIsAuthenticatedRedir = connectedRouterRedirect({
    ...userIsAuthenticatedDefaults,
    AuthenticatingComponent: Loading,
    redirectPath: '/login'
})

const userIsNotAuthenticatedDefaults = {
    // Want to redirect the user when they are done loading and authenticated
    authenticatedSelector: state => state.user.data === null && state.user.isLoading === false,
    wrapperDisplayName: 'UserIsNotAuthenticated'
}

export const userIsNotAuthenticated = connectedAuthWrapper(userIsNotAuthenticatedDefaults)

export const userIsNotAuthenticatedRedir = connectedRouterRedirect({
    ...userIsNotAuthenticatedDefaults,
    redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/protected',
    allowRedirectBack: false
})
