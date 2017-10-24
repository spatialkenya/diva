import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import Select from 'react-select';
import fetch from 'isomorphic-fetch';
import Footer from '../footer'
import { setNavSubtitle } from '../../actions';


import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.onCountySelectChange = this.onCountySelectChange.bind(this);
    this.getCounties = this.getCounties.bind(this);
    this.onSchoolSelectChange = this.onSchoolSelectChange.bind(this);
    this.getSchools = this.getSchools.bind(this);
  }
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(setNavSubtitle(""))
  }
  onCountySelectChange(newCounty) {
    this.props.history.push(`${process.env.PUBLIC_URL}/county/${newCounty}`)
  };
  getCounties(input) {
    if (!input) {
      return Promise.resolve({ options: [] });
    }

    return fetch(`https://erick-otenyo.carto.com/api/v2/sql?q=SELECT county_id,county FROM kenya_counties where county ilike '${input}%25'`).then((response) => response.json()).then((json) => {
      return { options: json.rows };
    });
  }
  onSchoolSelectChange(newSchool) {
    this.props.history.push(`${process.env.PUBLIC_URL}/schools/${newSchool}`)
  };
  getSchools(input) {
    if (!input) {
      return Promise.resolve({ options: [] });
    }

    return fetch(`https://erick-otenyo.carto.com/api/v2/sql?q=SELECT id,CONCAT(initcap(name),' - ' ,initcap(county) ,' ','County') as name FROM digischool where name ilike '%25${input}%25'`).then((response) => response.json()).then((json) => {
      return { options: json.rows };
    });
  }
  render() {
    return (
      <div>
        <div className="explorer-landing">
          <section className="header-area">
            <div className="container">
              <div className="row">
                <div className="section-bg col-lg-10 col-lg-offset-1 text-center">
                  <h1 className="section-heading">
                    DigiSchool Visualization and Analytics
                  </h1>
                  <p className="subtitle">Kenya Digital Literacy Programme - Collaborative Working & Monitoring</p>
                  <p className="learn-more">
                    <Link to={`${process.env.PUBLIC_URL}/about`}>Learn More</Link>
                  </p>
                  <div className="splash-button-section">
                    <div className="box all-link">
                      <Link className="btn btn-default" to={`${process.env.PUBLIC_URL}/map`}>
                        <div className="vertical-align">Schools Map</div>
                      </Link>
                    </div>
                    <div className="box or-text">
                      <div className="vertical-align">or</div>
                    </div>
                    <div className="box county-link">
                      <Select.Async name="form-field-name" simpleValue placeholder="Search School" valueKey="id" labelKey="name" loadOptions={this.getSchools} onChange={this.onSchoolSelectChange} />
                    </div>
                    <div className="box or-text">
                      <div className="vertical-align">or</div>
                    </div>
                    <div className="box county-link">
                      <Select.Async name="form-field-name" simpleValue placeholder="Search County" valueKey="county_id" labelKey="county" loadOptions={this.getCounties} onChange={this.onCountySelectChange} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </div>
      </div>
    )
  }
}

export default connect(null)(Home)
