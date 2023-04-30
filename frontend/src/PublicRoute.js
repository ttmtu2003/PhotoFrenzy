import { Route, Redirect } from 'react-router-dom';

function PublicRoute({ children, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={
        ({ currentLocation }) => (
          // if user is not logged in, go to unauthed routes (login, signup), otherwise, go to explore
          !isAuthenticated ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/explore',
                state: { referrer: currentLocation }
              }}
            />
          ))
      }
    />
  )
}

export default PublicRoute;