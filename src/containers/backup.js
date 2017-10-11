import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {JaneLayer, Source, MapLayer} from 'jane-maps';

import SideBar from '../components/map/schools.Sidebar';
import {mapLayers} from './config';

class SchoolLayer extends Component {
    static propTypes = {
        selectedStatus: PropTypes.string.isRequired,
        schools: PropTypes.array.isRequired,
        isFetching: PropTypes.bool.isRequired,
        dispatch: PropTypes.func.isRequired
    }

    componentDidMount() {
        const {dispatch, selectedStatus} = this.props
        dispatch(fetchSchoolsIfNeeded(selectedStatus))
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedStatus !== this.props.selectedStatus) {
            const {dispatch, selectedStatus} = nextProps
            dispatch(fetchSchoolsIfNeeded(selectedStatus))
        }
    }

    handleChange = nextStatus => {
        this
            .props
            .dispatch(selectStatus(nextStatus))
    }

    renderReceivedSchools() {
        const {selectedStatus, schools, isFetching} = this.props
        if (!selectedStatus === "Received") {
            return null
        }

        return [ < Source id = "schools_received" type = "geojson" data = {
                schools
            } />, < MapLayer id = "schools_received" source = "schools_received" {
                ...mapLayers.schools_received
            } />
        ].map((child, index) => ({
            ...child,
            key: index
        }));

    }
    render() {
        return (
            <JaneLayer
                id="school"
                name="Schools"
                icon="university"
                defaultSelected={this.props.defaultSelected}
                defaultDisabled={this.props.defaultDisabled}
                component={< Sidebar onChange = {
                this.handleChange
            } />}>
                {this.renderReceivedSchools()}
            </JaneLayer>
        );
    }

}

SchoolLayer.propTypes = {
    defaultSelected: PropTypes.bool,
    defaultDisabled: PropTypes.bool
};

SchoolLayer.defaultProps = {
    defaultSelected: false,
    defaultDisabled: false
};

export default SchoolLayer;


import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {selectStatus, fetchSchoolsIfNeeded} from '../actions'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import SideBar from '../components/maps/schools/SideBar';
import {Jane, JaneLayer, MapLayer} from 'jane-maps';

import 'jane-maps/dist/styles.css'

injectTapEventPlugin();

const mapboxGLOptions = {
    mapbox_accessToken: 'pk.eyJ1IjoiY3dob25nbnljIiwiYSI6ImNpczF1MXdrdjA4MXcycXA4ZGtyN2x5YXIifQ.3HGyME8tBs' +
            '6BnljzUVIt4Q',
    center: [
        -74.0084, 40.7121
    ],
    zoom: 13.62,
    minZoom: 9,
    maxZoom: null,
    pitch: 0,
    hash: false,
    navigationControlPosition: 'bottom-right'
};

class App extends Component {
    static propTypes = {
        selectedStatus: PropTypes.string.isRequired,
        schools: PropTypes.array.isRequired,
        isFetching: PropTypes.bool.isRequired,
        dispatch: PropTypes.func.isRequired
    }

    componentDidMount() {
        const {dispatch, selectedStatus} = this.props
        dispatch(fetchSchoolsIfNeeded(selectedStatus))
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedStatus !== this.props.selectedStatus) {
            const {dispatch, selectedStatus} = nextProps
            dispatch(fetchSchoolsIfNeeded(selectedStatus))
        }
    }

    handleChange = nextStatus => {
        this
            .props
            .dispatch(selectStatus(nextStatus))
    }

    render() {
        const {selectedStatus, schools, isFetching} = this.props
        const isEmpty = schools.length === 0
        return (
            <div>
                <MuiThemeProvider>
                    <div
                        style={{
                        height: '500px',
                        width: '500px'
                    }}>
                        <Jane mapboxGLOptions={mapboxGLOptions}>
                            <JaneLayer
                                id="feature"
                                name="Feature"
                                icon="university"
                                defaultSelected
                                component={< SideBar onChange = {
                                this.handleChange
                            } />}></JaneLayer>
                        </Jane>
                    </div>
                </MuiThemeProvider>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {selectedStatus, schoolsByStatus} = state
    const {isFetching, items: schools} = schoolsByStatus[selectedStatus] || {
        isFetching: true,
        items: []
    }

    return {selectedStatus, schools, isFetching}
}

export default connect(mapStateToProps)(App)
