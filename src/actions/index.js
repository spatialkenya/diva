import { URL, LOGIN } from '../config/Api'
import axios from 'axios'
export const REQUEST_SCHOOLS = 'REQUEST_SCHOOLS'
export const RECEIVE_SCHOOLS = 'RECEIVE_SCHOOLS'
export const SELECT_STATUS = 'SELECT_STATUS'

export const USER_LOGGING_IN = 'USER_LOGGING_IN'
export const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR'
export const USER_LOGGED_IN = 'USER_LOGGED_IN'
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT'
export const SET_NAV_SUBTITLE = 'SET_NAV_SUBTITLE'

export const selectStatus = status => ({ type: SELECT_STATUS, status })
export const setNavSubtitle = subtitle => ({ type: SET_NAV_SUBTITLE, subtitle })

export const requestSchools = status => ({ type: REQUEST_SCHOOLS, status })

export const receiveSchools = (status, json) => ({ type: RECEIVE_SCHOOLS, status, schools: json })


export const login = (username, password) => dispatch => {
    dispatch({
        type: USER_LOGGING_IN
    })
    return axios
        .post(URL + LOGIN, {
            username,
            password
        })
        .then(function (response) {
            dispatch({
                type: USER_LOGGED_IN,
                token:response.data.token,
                profile:response.data.profile
            });
        })
        .catch(function (error) {
            if(error.response=== undefined){
                dispatch({ type: USER_LOGIN_ERROR,error:error })
            }else{
                dispatch({ type: USER_LOGIN_ERROR,error:error.response.data })
            }
        });
}


const fetchSchools = status => dispatch => {
    dispatch(requestSchools(status))
    let status_logic;
    if (status === 'All') {
        status_logic = '>=0'
    } else if (status === 'Received') {
        status_logic = '>0'
    } else {
        status_logic = '=0'
    }
    return fetch(`https://erick-otenyo.carto.com/api/v2/sql?q=SELECT * from digischool where present_devices${status_logic}&format=geojson`)
        .then(response => response.json())
        .then(json => {
            dispatch(receiveSchools(status, json));
        })
}

const shouldFetchSchools = (state, status) => {
    const schools = state.schoolsByStatus[status]
    if (!schools) {
        return true
    }
    if (schools.isFetching) {
        return false
    }
}

export const fetchSchoolsIfNeeded = status => (dispatch, getState) => {
    if (shouldFetchSchools(getState(), status)) {
        return dispatch(fetchSchools(status))
    }
}


export const logout = () => dispatch => {
    dispatch({ type: USER_LOGGED_OUT })
}