import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions';

class LoginContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.onSubmit = this.onSubmit.bind(this);
  }

  render() {
    let {username, password} = this.state;
    return (
      <form name="loginForm" onSubmit={this.onSubmit}>
        <div className="form-group-collection">
          <div className="form-group">
            <label>Username:</label>
            <input type="text" name="username" onChange={e => this.setState({username: e.target.value})} value={username}/>
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" name="password" onChange={e => this.setState({password: e.target.value})} value={password}/>
          </div>
        </div>

        <input type="submit" value="Login" />
      </form>
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

export default connect(null, { login })(LoginContainer)
