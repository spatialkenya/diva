import React from 'react'
import PropTypes from 'prop-types'

const Summary = ({ school }) => (
    <div className="box-wrapper-1">
        <div className="clearfix">
            <div className="box-wrapper-2">
                <div className="box-wrapper-3">
                    <div className="box-head-wrapper">
                        <span className="box-head">School Details</span>
                    </div>
                </div >
                <div className="panels-wrapper">
                    <div className="row equal">
                        <div className="col-md-6">
                            <div className="panel panel-default">
                                <div className="panel-heading">Class One Enrollment</div>
                                <div className="panel-body">
                                    <h3>
                                        <i className="fa fa-child" aria-hidden="true"></i> {school.properties.class_one_enrollment}
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="panel panel-default">
                                <div className="panel-heading">No of Devices Present</div>
                                <div className="panel-body">
                                    <h3>
                                        <i className="fa fa-laptop" aria-hidden="true"></i> {school.properties.present_devices}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

Summary.protoTypes = {
    school: PropTypes.object.isRequired
}

export default Summary