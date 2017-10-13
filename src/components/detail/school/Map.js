import React from 'react';
import PropTypes from 'prop-types'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Jane, JaneLayer, Marker } from 'jane-maps';
import { mapboxGLOptions } from '../../../config/Map';
import 'jane-maps/dist/styles.css';


const MarkerComponent = () => (
    <div style={{ padding: '15px' }}>School Layer</div>
);

const SchoolMap = ({ school }) => (
    <MuiThemeProvider>
        <div style={{ marginTop: '15px' }}>
            <div className="modalmap" style={{ position: 'relative', height: '500px', marginBottom: '20px' }}>
                <Jane mapboxGLOptions={mapboxGLOptions}>
                    <JaneLayer id="school" name={school.properties.name} icon="university" component={<MarkerComponent />}>
                        <Marker label={school.properties.name} feature={school} flyTo zoom={10} />
                    </JaneLayer>
                </Jane>
            </div>
        </div>
    </MuiThemeProvider>
)

SchoolMap.propTypes = {
    school: PropTypes.object.isRequired
};

export default SchoolMap;