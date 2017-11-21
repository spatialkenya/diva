import React from 'react'
import PropTypes from 'prop-types'
import Heading from './Heading'
import Summary from './Summary'
import GOIP from './Goip'
import { G4S } from './G4s'
import { TPL } from './Tpl'
import { WEEE } from './Weee'
import { COM21 } from './Com21'
import Map from './Map'

const ProjectDetail = ({ summary }) => (
  <div>
    <Heading />
    <div className="col-md-6">
      <Summary summary={summary} />
      <G4S />
      <TPL />
    </div>
    <div className="col-md-6">
      <Map />
      <WEEE />
    </div>
    <div style={{ margin: '30px' }}>
      <GOIP />
      <COM21 />
    </div>
  </div>
)

ProjectDetail.PropTypes = {
  summary: PropTypes.object.isRequired
}

export default ProjectDetail;