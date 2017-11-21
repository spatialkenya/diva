import React from 'react';
import { connect } from 'react-redux'
import ProjectDetail from './ProjectDetail';
import { setNavSubtitle } from '../../../actions';
import axios from 'axios'

axios.defaults.baseURL = 'https://digischool.mybluemix.net/api/v1/';



class ProjectDetailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            summary: null,
        };
    }
    componentDidMount() {
        const { dispatch } = this.props
        dispatch(setNavSubtitle("DLP Project Analysis"))
        this.loadData();
    }
    loadData() {
        axios.get('/analysis/').then(summary => {
            console.log(summary)
            this.setState({ summary: summary.data })
        })
    }
    render() {
        let content;
        if (!this.state.summary) {
            content = <div>Loading...</div>;
        } else {
            const summary = this.state.summary;
            content = <div>
                <ProjectDetail summary={summary} />
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

export default connect(mapStateToProps)(ProjectDetailPage)

