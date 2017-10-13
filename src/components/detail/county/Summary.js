import React from 'react'
import PropTypes from 'prop-types'

const Summary = ({ county }) => (
    <div className="box-wrapper-1">
        <div className="clearfix">
            <div className="box-wrapper-2">
                <div className="box-wrapper-3">
                    <div className="box-head-wrapper">
                        <span className="box-head">County Details</span>
                    </div>
                </div >
                <div className="panels-wrapper">
                    <div className="row equal">
                        <div className="col-md-6">
                            <div className="panel panel-default">
                                <div className="panel-heading">Schools Summary</div>
                                <div className="panel-body">
                                    <h5>
                                        Total Number of Schools: {county.schools}
                                    </h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="panel panel-default">
                                <div className="panel-heading">Total number of Devices </div>
                                <div className="panel-body">
                                    <h5>No of devices here</h5>
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
    county:PropTypes.object.isRequired
}

export default Summary;