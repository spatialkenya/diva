import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { selectStatus, fetchSchoolsIfNeeded } from '../actions'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Jane, Legend } from 'jane-maps';
import { mapboxGLOptions } from '../config/Map'
import SchoolLayer from '../components/map/schools/SchoolLayer'
import AdminLayer from '../components/map/county/AdminLayer'
import 'jane-maps/dist/styles.css'
import './App.css'


injectTapEventPlugin();


class MappComponent extends Component {
  static propTypes = {
    selectedStatus: PropTypes.string.isRequired,
    schools: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch, selectedStatus } = this.props
    dispatch(fetchSchoolsIfNeeded(selectedStatus))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedStatus !== this.props.selectedStatus) {
      const { dispatch, selectedStatus } = nextProps
      dispatch(fetchSchoolsIfNeeded(selectedStatus))
    }
  }

  handleChange = nextStatus => {
    this
      .props
      .dispatch(selectStatus(nextStatus))
  }

  render() {
    const { selectedStatus, schools, isFetching } = this.props
    // const isEmpty = schools.length === 0
    return (
      <div>
        <MuiThemeProvider>
          <div className="fullscreen">
            <Jane mapboxGLOptions={mapboxGLOptions}>
              <AdminLayer />
              <SchoolLayer
                schools={schools}
                selectedStatus={selectedStatus}
                defaultSelected
                onChange={this.handleChange} />
              <Legend>
                <div className="legendSection">
                  <div>
                    <p>Legend</p>
                    <p><i style={{ background: '#00bcd4', padding: '1px 8px', borderRadius: '50%' }}></i>-- Schools with Devices</p>
                    <p><i style={{ background: '#ff6a00', padding: '1px 8px', borderRadius: '50%' }}></i>-- Schools yet to Receive</p>
                  </div>
                </div>
              </Legend>
            </Jane>
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { selectedStatus, schoolsByStatus } = state
  const { isFetching, items: schools } = schoolsByStatus[selectedStatus] || {
    isFetching: true,
    items: {}
  }

  return { selectedStatus, schools, isFetching }
}

export default connect(mapStateToProps)(MappComponent)
