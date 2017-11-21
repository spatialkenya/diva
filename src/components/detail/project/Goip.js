import React from 'react'
import $ from 'jquery';
import 'jquery-ui-bundle';
import 'pivottable/dist/pivot.min.js';
import 'pivottable/dist/gchart_renderers.min.js';

const renderers = $.extend($.pivotUtilities.renderers, $.pivotUtilities.gchart_renderers);


class GOIP extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            issues: null
        }
    }

    componentDidMount() {
        this.loadIssues();
    }
    loadIssues() {
        fetch('https://digischool.mybluemix.net/api/v1/issues/').then(response => {
            if (response.ok) {
                response.json().then(issues => {
                    this.setState({ issues: issues });
                });
            } else {
                response.json().then(error => {
                    alert(`Failed to fetch issues: ${error.message}`);
                });
            }
        }).catch(err => {
            alert(`Error in fetching data from server: ${err.message}`);
        });
    }

    render() {
        // const issues_count = issues.length
        let content;
        if (!this.state.issues) {
            content = <div>Loading Device Issues Analytics...</div>;
        }
        if (this.state.issues) {
            $("#output").pivotUI(
                this.state.issues, {
                    renderers: renderers,
                    derivedAttributes: {
                        "Month": $.pivotUtilities.derivers.dateFormat("date", "%n-%y")
                    },
                    rows: ["status"],
                    cols: ["Month"],
                    rendererName: "Bar Chart"
                });
        }

        return (
            <div className="row  box-wrapper-1">
                <div className="col-md-12">
                    <div className="call-issues-details clearfix">
                        <div className="box-wrapper-2">
                            <div className="box-wrapper-3">
                                <div className="box-head-wrapper">
                                    <span className="box-head">Diva - Device Issues Analysis |
                    <span className="label label-default">
                                            <i className="fa fa-info-circle" aria-hidden="true"></i>
                                            Data from GOIP Call Centre
                    </span>
                                    </span>
                                </div>
                            </div>
                            <div className="panels-wrapper">
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h5>
                                            GOIP - Call Centre
                    </h5>
                                    </div>
                                    <div className="panel-body">
                                        <div>
                                            <div>
                                                {content}
                                                <div id="output"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default GOIP;