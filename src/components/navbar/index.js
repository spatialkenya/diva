import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';
import { userIsAuthenticated, userIsNotAuthenticated } from '../../util/Auth'

const UserName = ({ user }) => (<li><a className="nav-item">{user}</a></li>)
const LoginLink = userIsNotAuthenticated(() => <li><NavLink activeClassName="active" to={`${process.env.PUBLIC_URL}/login`}>Login</NavLink></li>)
const LogoutLink = userIsAuthenticated(({ logout }) => <li><a href="#" onClick={() => logout()}>Logout</a></li>)

export default class Navbar extends React.Component {

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link to={`${process.env.PUBLIC_URL}/`} className="navbar-brand"></Link>
          <div className="navbar-title">DiVA
            <span className="title subhead">
              {"  " + this.props.subtitle}
            </span>
          </div>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav navbar-right ">
            <UserName user={this.props.user}/>
            <li>
              <NavLink className="nav-item" activeClassName="active" exact to={`${process.env.PUBLIC_URL}/`}>Home</NavLink>
            </li>
            <li>
              <NavLink className="nav-item" activeClassName="active" to={`${process.env.PUBLIC_URL}/about`}>About</NavLink>
            </li>
            <LoginLink />
            <LogoutLink logout={this.props.logout}/>
          </ul>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  subtitle: PropTypes.string,
  user:PropTypes.string,
  logout:PropTypes.func
};
