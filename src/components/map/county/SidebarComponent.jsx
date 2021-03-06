import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import {Tabs, Tab} from 'material-ui/Tabs';
import 'react-select/dist/react-select.css';

const UIComponent = (props) => {
  return (
    <div>
      <Tabs className="sidebar-tabs">
        <Tab label="Data">
          <div className="sidebar-tab-content">
            <div style={{
              padding: '15px'
            }}>
              <h4>Kenya Counties</h4>

              <Checkbox label="All Counties" checked={props.checkboxes.counties} onCheck={() => props.onCheckboxChange('counties')}/>
              <Checkbox label="Lot 2 Counties" checked={props.checkboxes.counties_lot2} onCheck={() => props.onCheckboxChange('counties_lot2')}/>
            </div>
          </div>
        </Tab>
        <Tab label="About">
          <div className="sidebar-tab-content">
            <div className="padded">
              <h4>Source of Data</h4>
              <p>The Counties data is obtained from IEBC</p>
              <p/>
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default UIComponent;
