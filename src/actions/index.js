export const REQUEST_SCHOOLS = 'REQUEST_SCHOOLS'
export const RECEIVE_SCHOOLS = 'RECEIVE_SCHOOLS'
export const SELECT_STATUS = 'SELECT_STATUS'

export const USER_LOGGING_IN = 'USER_LOGGING_IN'
export const USER_LOGGED_IN = 'USER_LOGGED_IN'
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT'
export const SET_TOKEN = "SET_TOKEN";



export const selectStatus = status => ({ type: SELECT_STATUS, status })

export const requestSchools = status => ({ type: REQUEST_SCHOOLS, status })

export const receiveSchools = (status, json) => ({ type: RECEIVE_SCHOOLS, status, schools: json })

export const setToken = data => ({ type: SET_TOKEN, data })

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


export function logout() {
    return {
      type:USER_LOGGED_OUT
    }
  }