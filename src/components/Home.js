import React from 'react'
import { VisibleOnlyLoggedIn } from '../Auth'

const LoggedInOnlyLink = VisibleOnlyLoggedIn(() => <div>Hello</div>)


export default function Home() {
  return (
    <div>
      <h4>{"This demo serves as an example on how to use redux-auth-wrapper with react-router-4"}</h4>
      <h4>{"Notice that Protected and Admin routes are protected and you will have to log in to see them."}</h4>
      <LoggedInOnlyLink />
      </div>
  )
}

