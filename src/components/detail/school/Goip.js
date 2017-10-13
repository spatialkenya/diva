import React from 'react'

export const GOIP = () => (
  <div className="row  box-wrapper-1">
    <div className="col-md-12">
      <div className="call-issues-details clearfix">
        <div className="box-wrapper-2">
          <div className="box-wrapper-3">
            <div className="box-head-wrapper">
              <span className="box-head">Device Problems Reported</span>
            </div>
          </div>
          <div className="panels-wrapper">
            <div className="panel with-nav-tabs panel-default">
              <div className="panel-heading">
                <ul className="nav nav-tabs">
                  <li className="active">
                    <a href="#tab1default" className="closed" data-toggle="tab">Closed</a>
                  </li>
                  <li>
                    <a href="#tab2default" className="resolved" data-toggle="tab">Resolved</a>
                  </li>
                  <li>
                    <a href="#tab3default" className="escalated" data-toggle="tab">Escalated</a>
                  </li>
                </ul>
              </div>
              <div className="panel-body">
                <div className="tab-content">
                  <div className="tab-pane fade in active" id="tab1default">number of closed issues</div>
                  <div className="tab-pane fade" id="tab2default">Number of resolved issues</div>
                  <div className="tab-pane fade" id="tab3default">Number of escalated issues</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)
