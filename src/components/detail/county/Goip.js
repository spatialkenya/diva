import React from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery';
import pivottable from 'pivottable';

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
  componentDidUpdate(prevProps) {
    if (prevProps.county_id !== this.props.county_id) {
      this.loadIssues();
    }
  }
  loadIssues() {
    fetch(`https://digischool.mybluemix.net/api/v1/issues/?school__county=${this.props.county_id}`).then(response => {
      if (response.ok) {
        response.json().then(issues => {
          console.log(issues);
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
      content = <div>Loading Issues...</div>;
    }
    if (this.state.issues) {
      $("#output").pivotUI(
        this.state.issues, {
          derivedAttributes: {
            "Year": $.pivotUtilities.derivers.dateFormat("date", "%y")
          },
          rows: ["error_code"],
          cols: ["Year"]
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

GOIP.propTypes = {
  county_id: PropTypes.number.isRequired
}

export default GOIP;