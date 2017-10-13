import React from 'react';
import PropTypes from 'prop-types';
import {Tabs, Tab} from 'material-ui/Tabs';
import Select from 'react-select';

import 'react-select/dist/react-select.css';

const SideBar = ({value, onChange}) => {
    return (
        <div>
            <Tabs className="sidebar-tabs">
                <Tab label="Data">
                    <div className="sidebar-tab-content">
                        <div
                            style={{
                            padding: '15px'
                        }}>
                            <h4>School Layers</h4>
                            <h5>{value}</h5>
                            <h5> Filter displayed schools by Device Status</h5>
                            <Select
                                name="form-field-name"
                                options={[
                                {
                                    value: 'All',
                                    label: 'All'
                                }, {
                                    value: 'Received',
                                    label: 'Received'
                                }, {
                                    value: 'Not Received',
                                    label: 'Not Received'
                                }
                            ]}
                                onChange={onChange}
                                simpleValue
                                clearable={false}
                                placeholder="Filter schools by device status"
                                value={value}/>
                        </div>
                    </div>
                </Tab>
                <Tab label="About">
                    <div className="sidebar-tab-content">
                        <div className="padded"></div>
                    </div>
                </Tab>
            </Tabs>
        </div>
    );
};

SideBar.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default SideBar;