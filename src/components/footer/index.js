import React from 'react'
import './Footer.css'

const Footer = () => (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-3 col-sm-3 col-xs-6 column">
            <dl>
              <dt>
                <h4 className="">DiVA</h4>
              </dt>
              <dd>
                <a href="/digischool-ui">Home</a>
              </dd>
              <dd>
                <a href="/digischool-ui/about">
                  About</a>
              </dd>
              <dd>
                <a href="/schools/explorer">Map</a>
              </dd>
            </dl>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-sm-6 col-xs-12 footer-logo">
            <a href="/digischool-ui" className="logo-wrapper">
  
              <img className="logo" src="https://s3-eu-west-1.amazonaws.com/myspatialdata/digischool-logo2.png" alt="DiVA"/>
  
              <p className="copyright">Copyright © DiVA Project. All rights reserved.</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );

export default Footer;