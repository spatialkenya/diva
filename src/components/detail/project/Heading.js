import React from 'react';
import { withRouter } from 'react-router-dom'

const Back = withRouter(({ history }) => {
    return (
        <div className="button-container col-md-3 col-md-push-9">
            <div className="back-button">
                <button type="button" className="button-back" onClick={history.goBack}>
                    <div>
                        <div>
                            <span className="fa fa-chevron-left"></span>
                            <span className="back-text"> BACK </span>
                        </div>
                    </div>
                </button>
            </div>
        </div>
    )
})

const Heading = () => (
    <div className="col-md-12">
        <div className="row">
            <Back />
            <div className="col-md-9 col-md-pull-3">
                <h3>Digischool -  DiVA Analysis</h3>
            </div>
        </div>
    </div>
)

export default Heading;