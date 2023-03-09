import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ children, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={
        ({ location }) => (
          // if logged in, go to authedroutes, otherwise, redirect to login page
          isAuthenticated ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location }
              }}
            />
          )
        )
      }
    />
  )
}
export default PrivateRoute