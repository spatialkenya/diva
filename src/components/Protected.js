import React from 'react'
import { connect } from 'react-redux'

const Protected = ({ user }) => {
  return (
    <div>{`This is a protected page, you must be logged in if you are seeing this. Welcome ${user.username}`}</div>
  )
}

export default connect(state => ({ user: state.currentUser.profile }))(Protected)
