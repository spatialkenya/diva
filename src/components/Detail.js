import React from 'react'
import store from '../store'
import _ from 'lodash'

const Detail = ({ match }) => {
    const schools = store.getState().schoolsByStatus
    let school
    if (schools.All) {
         school = _.find(schools.All.items.features, function (x) { return x.properties.id == match.params.schoolId })
         console.log(school)

    }else{
         school = null
    }

    return (<div>{school ? school.properties.name:match.params.schoolId}</div>)

}

export default Detail
