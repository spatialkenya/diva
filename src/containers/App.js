import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import './App.css'
import { logout } from '../actions'
import {
  userIsAuthenticatedRedir, userIsNotAuthenticatedRedir,
} from '../Auth'

import Navbar from '../components/navbar'
import Home from '../components/home'
import NotFound from '../components/notfound'
import About from '../components/about'
import LoginContainer from '../components/login'
import MappComponent from './Mapp'


const getUserName = user => {
  if (user.profile) {
    return `Welcome ${user.profile.username}`
  }
  return
}

const Login = userIsNotAuthenticatedRedir(LoginContainer)
const Mapp = userIsAuthenticatedRedir(MappComponent)


function App({ user, logout }) {
  return (
    <Router>
      <div className="wrapper">
        <Navbar subhead={"Schools Map"} user={getUserName(user)} logout={logout} />
        <div className="content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/map" component={Mapp} />
            <Route path="/about" component={About} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </Router>
  )
}

const mapStateToProps = state => ({
  user: state.currentUser
})


export default connect(mapStateToProps, { logout })(App)
