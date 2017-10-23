import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import './App.css'
import { logout } from '../actions'
import {
  userIsAuthenticatedRedir, userIsNotAuthenticatedRedir,
} from '../util/Auth'

import Navbar from '../components/navbar'
import Home from '../components/home'
import NotFound from '../components/notfound'
import About from '../components/about'
import LoginContainer from '../components/login'
import MappComponent from './Mapp'
import SchoolDetailPage from '../components/detail/school'
import CountyDetailPage from '../components/detail/county'
import LoadingBar from 'react-redux-loading-bar'

const getUserName = user => {
  if (user.profile) {
    return `Welcome ${user.profile.username}`
  }
  return
}

const Login = userIsNotAuthenticatedRedir(LoginContainer)
// const Mapp = userIsAuthenticatedRedir(MappComponent)
const SchoolDetail = userIsAuthenticatedRedir(SchoolDetailPage)
const CountyDetail = userIsAuthenticatedRedir(CountyDetailPage)


function App({ user, subtitle, logout }) {
  return (
    <Router>
      <div>
        <header>
          <LoadingBar style={{ backgroundColor: 'rgb(0, 188, 212)', height: '5px', zIndex: 1 }} />
          <Navbar subtitle={subtitle} user={getUserName(user)} logout={logout} />
        </header>
        <div className="content">
          <Switch>
            <Route exact path={`${process.env.PUBLIC_URL}/`} component={Home} />
            <Route path={`${process.env.PUBLIC_URL}/login`} component={Login} />
            <Route path={`${process.env.PUBLIC_URL}/map`} component={MappComponent} />
            <Route path={`${process.env.PUBLIC_URL}/about`} component={About} />
            <Route path={`${process.env.PUBLIC_URL}/schools/:schoolId`} component={SchoolDetail} />
            <Route path={`${process.env.PUBLIC_URL}/county/:countyId`} component={CountyDetail} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </Router>
  )
}

const mapStateToProps = state => ({
  user: state.currentUser,
  subtitle: state.subTitle
})


export default connect(mapStateToProps, { logout })(App)
