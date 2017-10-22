import { URL, LOGIN } from '../config/Api'
import constants from '../constants'
import axios from 'axios'
export const selectStatus = status => ({ type: constants.SELECT_STATUS, status })
export const setNavSubtitle = subtitle => ({ type: constants.SET_NAV_SUBTITLE, subtitle })

export const requestSchools = status => ({ type: constants.REQUEST_SCHOOLS, status })

export const receiveSchools = (status, json) => ({ type: constants.RECEIVE_SCHOOLS, status, schools: json })


export const login = (username, password) => dispatch => {
    dispatch({
        type: constants.USER_LOGGING_IN
    })
    return axios
        .post(URL + LOGIN, {
            username,
            password
        })
        .then(function (response) {
            localStorage.setItem('user', JSON.stringify(response.data))
            dispatch({
                type: constants.USER_LOGGED_IN,
                profile: response.data.profile
            });
        })
        .catch(function (error) {
            if (error.response === undefined) {
                dispatch({ type: constants.USER_LOGIN_ERROR, error: error })
            } else {
                dispatch({ type: constants.USER_LOGIN_ERROR, error: error.response.data })
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
    dispatch({ type: constants.USER_LOGGED_OUT })
    localStorage.removeItem('user')
}