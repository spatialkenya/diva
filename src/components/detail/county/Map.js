import React from 'react';
import PropTypes from 'prop-types'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Jane, JaneLayer, MapLayer, Source, Legend } from 'jane-maps';
import { mapboxGLOptions } from '../../../config/Map';
import bbox from 'geojson-bbox';
import 'jane-maps/dist/styles.css';

mapboxGLOptions.mapStyle = 'mapbox://styles/mapbox/streets-v9';

const CountyMapComponent = () => (
    <div style={{
        padding: '15px'
    }}>County Layer</div>
);

const SchoolComponent = () => (
    <div style={{
        padding: '15px'
    }}>County Layer</div>
);

const CountyMap = ({ county }) => {
    const school_data = `https://erick-otenyo.carto.com/api/v2/sql?q=SELECT%20*%20FROM%20digischool where county='${county.properties.name}'&format=geojson`
    return (
        <MuiThemeProvider>
            <div style={{
                marginTop: '15px'
            }}>
                <div className="modalmap" style={{
                    position: 'relative',
                    height: '450px',
                    marginBottom: '20px'
                }}>
                    <Jane mapboxGLOptions={mapboxGLOptions}>
                        <JaneLayer id="County" name='County' icon="flag" component={< CountyMapComponent />}>
                            <Source id="county" type="geojson" data={county} />
                            <MapLayer id="countylayer" source="county" type="line" paint={{
                                "line-color": "#454647",
                                "line-width": 2
                            }} layout={{
                                "line-join": "round",
                                "line-cap": "round"
                            }} fitFeatureBounds={bbox(county)} />
                        </JaneLayer>
                        <JaneLayer id="schools" name='Schools' icon="university" component={< SchoolComponent />}>
                            <Source id="schools" type="geojson" data={school_data} />
                            <MapLayer id="schoollayer" source="schools" type="circle" paint={{
                                "circle-color": {
                                    property: 'present_devices',
                                    stops: [
                                        [
                                            0, '#ff6a00'
                                        ],
                                        [1, '#11b4da']
                                    ]
                                },
                                "circle-radius": 5,
                                "circle-stroke-width": 1,
                                "circle-stroke-color": "#fff"
                            }} />
                        </JaneLayer>
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
            </div>
        </MuiThemeProvider>
    );
}

CountyMap.propTypes = {
    county: PropTypes.object.isRequired
}

export default CountyMap;