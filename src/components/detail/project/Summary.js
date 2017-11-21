import React from 'react'
import PropTypes from 'prop-types'

const Summary = ({ summary }) => (
    <div className="box-wrapper-1">
        <div className="clearfix">
            <div className="box-wrapper-2">
                <div className="box-wrapper-3">
                    <div className="box-head-wrapper">
                        <span className="box-head">Project Summary:</span>
                    </div>
                </div >
                <div className="panels-wrapper">
                    <div className="row equal">
                        <div className="col-md-6">
                            <div className="panel panel-default">
                                <div className="panel-heading">Number of schools:</div>
                                <div className="panel-body">
                                    <h3 style={{ textAlign: 'center' }}>
                                        <i className="fa fa-university" aria-hidden="true"></i> {summary.schools_total}
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="panel panel-default">
                                <div className="panel-heading">Class one enrollment: </div>
                                <div className="panel-body">
                                    <h3 style={{ textAlign: 'center' }}>
                                        <i className="fa fa-child" aria-hidden="true"></i> {summary.class_one_total}
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="panel panel-default">
                                <div className="panel-heading">Total Devices Delivered: </div>
                                <div className="panel-body">
                                    <h3 style={{ textAlign: 'center' }}>
                                        <i className="fa fa-laptop" aria-hidden="true"></i> {summary.total_devices}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

Summary.propTypes = {
    summary: PropTypes.object.isRequired
}

export default Summary;