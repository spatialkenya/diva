import React from 'react';
import { connect } from 'react-redux'
import CountyDetail from './CountyDetail';
import { setNavSubtitle } from '../../../actions';
import './County.css';
import axios from 'axios'

axios.defaults.baseURL = 'https://digischool.mybluemix.net/api/v1/';



class CountyDetailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            county: null,
        };
    }
    componentDidMount() {
        const { dispatch } = this.props
        dispatch(setNavSubtitle("County Details"))
        this.loadData();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.match.params.countyId !== this.props.match.params.countyId) {
            this.loadData();
        }
    }
    loadData() {
        axios.get(`/counties/${this.props.match.params.countyId}`).then(county => {
            this.setState({ county: county.data })
        })
    }
    render() {
        let content;
        if (!this.state.county) {
            content = <div>Loading...</div>;
        } else {
            const county = this.state.county;
            content = <div>
                <CountyDetail county={county} />
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

const mapStateToProps = state => ({
    token: state.currentUser.token
})

export default connect(mapStateToProps)(CountyDetailPage)

