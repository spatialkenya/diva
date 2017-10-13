import React from 'react'
import PropTypes from 'prop-types'
import Heading from './Heading'
import Summary from './Summary'
import GOIP from './Goip'
import {G4S} from './G4s'
import {TPL} from './Tpl'
import CountyMap from './Map'
import {WEEE} from './Weee'
import {COM21} from './Com21'

const CountyDetail = ({ county }) => (
  <div>
    <Heading county={county.properties} />
    <div className="col-md-6">
      <Summary county={county.properties} />
      <GOIP county_id={county.id} />
      <G4S county_id={county.id} />
      <TPL county_id={county.id} />
    </div>
    <div className="col-md-6">
      <CountyMap county={county} />
      <WEEE county_id={county.id} />
      <COM21 county_id={county.id} />
    </div>
  </div>
)

CountyDetail.PropTypes = {
  county: PropTypes.object.isRequired
}

export default CountyDetail;