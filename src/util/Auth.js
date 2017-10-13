import React from 'react'
import { Link } from 'react-router-dom'
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper'

import Loading from '../components/Loading'

const locationHelper = locationHelperBuilder({})

const userIsAuthenticatedDefaults = {
    authenticatedSelector: state => state.currentUser.token !== null,
    authenticatingSelector: state => state.currentUser.isLoading,
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
    authenticatedSelector: state => state.currentUser.token === null && state.currentUser.isLoading === false,
    wrapperDisplayName: 'UserIsNotAuthenticated'
}

export const userIsNotAuthenticated = connectedAuthWrapper(userIsNotAuthenticatedDefaults)

export const userIsNotAuthenticatedRedir = connectedRouterRedirect({
    ...userIsNotAuthenticatedDefaults,
    authenticatingSelector: state => state.currentUser.isLoading,
    AuthenticatingComponent: Loading,
    redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
    allowRedirectBack: false
})

export const VisibleOnlyLoggedIn = connectedAuthWrapper({
    authenticatedSelector: state => state.currentUser.token !== null,
    FailureComponent: () => <div><h5>Please login to view this content</h5> <Link to='/login'>Login</Link></div>,
    wrapperDisplayName: 'VisibleOnlyLoggedIn',
})