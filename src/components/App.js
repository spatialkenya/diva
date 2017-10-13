import React from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import './App.css'
import { logout } from '../actions'
import { userIsAuthenticatedRedir, userIsNotAuthenticatedRedir,
         userIsAuthenticated, userIsNotAuthenticated } from '../Auth'

import ProtectedComponent from './Protected'
import LoginComponent from './Login'
import Home from './Home'
import MappComponent from '../containers/Mapp'
import Detail from './Detail'

const getUserName = user => {
  if (user.profile) {
    return `Welcome ${user.profile.username}`
  }
  return `Not logged in`
}

// Need to apply the hocs here to avoid applying them inside the render method
const Login = userIsNotAuthenticatedRedir(LoginComponent)
const Protected = userIsAuthenticatedRedir(ProtectedComponent)
const Mapp = userIsAuthenticatedRedir(MappComponent)

// Only show login when the user is not logged in and logout when logged in
// Could have also done this with a single wrapper and `FailureComponent`
const UserName = ({ user }) => (<div className="username">{getUserName(user)}</div>)
const LoginLink = userIsNotAuthenticated(() => <NavLink activeClassName="active" to="/login">Login</NavLink>)
const LogoutLink = userIsAuthenticated(({ logout }) => <a href="#" onClick={() => logout()}>Logout</a>)

function App({ user,logout }) {
  return (
    <Router>
      <div className="wrapper">
        <nav className="navigation">
          <NavLink activeClassName="active" exact to="/">Home</NavLink>
          <NavLink activeClassName="active" exact to="/protected">Protected</NavLink>
          <NavLink activeClassName="active" exact to="/schools/207079">Schools</NavLink>
        </nav>
        <nav className="authNavigation">
          <LoginLink />
          <LogoutLink logout={logout} />
          <UserName user={user} />
        </nav>
        <div className="content">
          <Route exact path="/" component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/protected" component={Protected}/>
          <Route path="/explorer" component={Mapp}/>
          <Route path="/schools/:schoolId" component={Detail}/>
        </div>
    </div>
    </Router>
  )
}

const mapStateToProps = state => ({
  user: state.currentUser
})


export default connect(mapStateToProps, { logout })(App)
