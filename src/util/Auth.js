import React from 'react'
import { Link } from 'react-router-dom'
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper'

import Loading from '../components/Loading'

const locationHelper = locationHelperBuilder({})

const userIsAuthenticatedDefaults = {
    authenticatedSelector: state => localStorage.getItem('user') !== null,
    authenticatingSelector: state => state.currentUser.isLoading,
    wrapperDisplayName: 'UserIsAuthenticated'
}

export const userIsAuthenticated = connectedAuthWrapper(userIsAuthenticatedDefaults)

export const userIsAuthenticatedRedir = connectedRouterRedirect({
    ...userIsAuthenticatedDefaults,
    AuthenticatingComponent: Loading,
    redirectPath: `${process.env.PUBLIC_URL}/login`
})

const userIsNotAuthenticatedDefaults = {
    // Want to redirect the user when they are done loading and authenticated
    authenticatedSelector: state => localStorage.getItem('user') === null && state.currentUser.isLoading === false,
    wrapperDisplayName: 'UserIsNotAuthenticated'
}

export const userIsNotAuthenticated = connectedAuthWrapper(userIsNotAuthenticatedDefaults)

export const userIsNotAuthenticatedRedir = connectedRouterRedirect({
    ...userIsNotAuthenticatedDefaults,
    authenticatingSelector: state => state.currentUser.isLoading,
    AuthenticatingComponent: Loading,
    redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || `${process.env.PUBLIC_URL}/`,
    allowRedirectBack: false
})

export const VisibleOnlyLoggedIn = connectedAuthWrapper({
    authenticatedSelector: state => localStorage.getItem('user') !== null,
    FailureComponent: () => <div><h5>Please login to view this content</h5> <Link to={`${process.env.PUBLIC_URL}/login`}>Login</Link></div>,
    wrapperDisplayName: 'VisibleOnlyLoggedIn',
})