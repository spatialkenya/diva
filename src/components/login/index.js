import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { login,setNavSubtitle } from '../../actions';
import './Login.css'

class LoginContainer extends Component {

  static propTypes = {
    error: PropTypes.any
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(setNavSubtitle("Login"))
  }
  
  render() {
    let { username, password } = this.state;
    const { error } = this.props
    let el
    if (error) {
      if (error.non_field_errors) {
        el = <p className="has-error">{error.non_field_errors}</p>
      } else {
        el = <p className="has-error">{error.message}</p>
      }
    }
    return (
      <div className="form">
        <div className="thumbnail"><img src="https://s3-eu-west-1.amazonaws.com/myspatialdata/digischool-logo2.png" alt="diva" /></div>
        <form className="login-form" onSubmit={this.onSubmit}>
          {el}
          <input type="text" placeholder="username" required onChange={e => this.setState({ username: e.target.value })} value={username} />
          <input type="password" placeholder="password" required onChange={e => this.setState({ password: e.target.value })} value={password} />
          <button type="submit">login</button>
        </form>
      </div>
    )
  }
  onSubmit(e) {
    e.preventDefault();
    let { username, password } = this.state;
    this.props.login(username, password);
    this.setState({
      username: '',
      password: ''
    });
  }
}

const mapStateToProps = state => ({
  error: state.currentUser.error
})

export default connect(mapStateToProps, { login })(LoginContainer)
