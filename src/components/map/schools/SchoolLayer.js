import React from 'react'
import PropTypes from 'prop-types';
import {JaneLayer, Source, MapLayer} from 'jane-maps';

import SideBar from './SideBar';
import {mapLayers} from './config';

const SchoolLayer = ({selectedStatus, schools, onChange, defaultDisabled, defaultSelected}) => {
    const handleFeatureClick = (features) => {
        if (features) {
            console.log(features)
        } else {
            console.log("TSSS")
        }
    }
    return (
        <JaneLayer
            id="schools"
            name="Schools"
            icon="university"
            defaultSelected={defaultSelected}
            defaultDisabled={defaultDisabled}
            component={< SideBar value = {
            selectedStatus
        }
        on onChange = {
            onChange
        } />}>
            <Source id="schools_received" type="geojson" data={schools}/>
            <MapLayer
                id="schools_received"
                source="schools_received"
                { ...mapLayers.schools_received }
                onClick={handleFeatureClick}/>
        </JaneLayer>
    );

}

SchoolLayer.propTypes = {
    schools: PropTypes.object.isRequired,
    defaultSelected: PropTypes.bool,
    defaultDisabled: PropTypes.bool
};

SchoolLayer.defaultProps = {
    defaultSelected: false,
    defaultDisabled: false
};

export default SchoolLayer
