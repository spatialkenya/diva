import React from 'react';
import SchoolDetail from './SchoolDetail';
import { connect } from 'react-redux';
import './School.css';
import 'isomorphic-fetch';
import { setNavSubtitle } from '../../../actions';

class SchoolDetailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            school: null,
        };
    }
    componentDidMount() {
        const { dispatch } = this.props
        dispatch(setNavSubtitle("School Detail"))
        this.loadData();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.match.params.schoolId !== this.props.match.params.schoolId) {
            this.loadData();
        }
    }
    loadData() {
        fetch(`https://erick-otenyo.carto.com/api/v2/sql?q=SELECT * FROM digischool WHERE id=${this.props.match.params.schoolId}&format=geojson`).then(response => {
            if (response.ok) {
                response.json().then(school => {
                    this.setState({ school: school.features[0] });
                });
            } else {
                response.json().then(error => {
                    alert(`Failed to fetch data: ${error.message}`);
                });
            }
        }).catch(err => {
            alert(`Error in fetching data from server: ${err.message}`);
        });
    }
    render() {
        let content;
        if (!this.state.school) {
            content = <div>Loading...</div>;
        } else {
            const school = this.state.school;
            content = <div>
                <SchoolDetail school={school} />
            </div>;
        }
        return (
            <div>
                <div className="detail-page">
                    {content}
                </div>
            </div>
        );
    }
}

export default connect(null)(SchoolDetailPage)

