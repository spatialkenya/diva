import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { login } from '../../actions';
import './Login.css'

class LoginContainer extends Component {

  static propTypes = {
    error: PropTypes.any.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.onSubmit = this.onSubmit.bind(this);
  }

  render() {
    let { username, password } = this.state;
    const { error } = this.props
    return (
      <div className="form">
        <div className="thumbnail"><img src="https://s3-eu-west-1.amazonaws.com/myspatialdata/digischool-logo2.png" alt="diva" /></div>
        <form className="login-form" onSubmit={this.onSubmit}>
          {error ? <p>test</p> : null}
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
