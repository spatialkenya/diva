import React from 'react'
import PropTypes from 'prop-types'
import Heading from './Heading'
import Summary from './Summary'
import {GOIP} from './Goip'
import {G4S} from './G4s'
import {TPL} from './Tpl'
import SchoolMap from './Map'
import {WEEE} from './Weee'
import {COM21} from './Com21'

const SchoolDetail = ({ school }) => (
  <div>
    <Heading school={school.properties} />
    <div className="col-md-6">
      <Summary school={school} />
      <GOIP school={school.properties.id} />
      <G4S school={school.properties.id} />
      <TPL school={school.properties.id} />
    </div>
    <div className="col-md-6">
      <SchoolMap school={school} />
      <WEEE school={school.properties.id} />
      <COM21 school={school.properties.id} />
    </div>
  </div>
)

SchoolDetail.PropTypes = {
  school: PropTypes.object.isRequired
}

export default SchoolDetail;