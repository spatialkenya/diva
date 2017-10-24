import React from 'react'
import PropTypes from 'prop-types';
import { JaneLayer, Source, MapLayer } from 'jane-maps';
import mapboxgl from 'mapbox-gl';

import SideBar from './SideBar';
import { mapLayers } from './config';

const SchoolLayer = ({ selectedStatus, schools, onChange, defaultDisabled, defaultSelected }) => {
    const handleFeatureClick = (features, map) => {
        features.forEach(feature => {
            const detail_url = `${process.env.PUBLIC_URL}/schools/${feature.properties.id}`;
            const detail_link = '<a className="school-link" href="' + detail_url + '">View School Details</a>';
            const content = '<div class="panel panel-default"><div class="panel-heading"><i class="fa fa-info-circle" aria-hidden="true" style="padding-right: 5px;"></i>' + feature.properties.name + ' PRIMARY' + '</div><div class="panel-body">' + detail_link + '</div>'
            new mapboxgl.Popup().setLngLat(feature.geometry.coordinates).setHTML(content).addTo(map);
        });
    }
    return (
        <JaneLayer
            id="schools"
            name="Schools"
            icon="university"
            defaultSelected={defaultSelected}
            defaultDisabled={defaultDisabled}
            component={< SideBar value={
                selectedStatus
            }
                on onChange={
                    onChange
                } />}>
            <Source id="schools_received" type="geojson" data={schools} />
            <MapLayer
                id="schools_received"
                source="schools_received"
                { ...mapLayers.schools }
                onClick={handleFeatureClick} />
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
