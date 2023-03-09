import { lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

// routes
import PrivateRoute from './PrivateRoute.js'
import PublicRoute from './PublicRoute.js'

// pages
const LoginPage = lazy(() => import('./pages/LoginPage/index.js'))
const SignupPage = lazy(() => import('./pages/SignupPage/index.js'))
// const ExplorePage = lazy(() => import('./pages/ExplorePage/index.js'))
// const MyLibPage = lazy(() => import('./pages/MyLibPage/index.js'))
// const BookDetailPage = lazy(() => import('./pages/BookDetailPage/index.js'))
// const LibBookDetailPage = lazy(() => import('./pages/LibBookDetailPage/index.js'))
// const StatsPage = lazy(() => import('./pages/StatsPage/index.js'))

function Routing({ isAuthenticated }) {
  // authenticated routes 
  // const authedRoutes = [
  //   {
  //     component: ExplorePage,
  //     path: 'explore',
  //     exact: true
  //   },
  //   {
  //     component: BookDetailPage,
  //     path: `explore/book-detail/:bookId`,
  //     exact: true
  //   },
  //   {
  //     component: MyLibPage,
  //     path: 'mylibrary',
  //     exact: true
  //   },
  //   {
  //     component: LibBookDetailPage,
  //     path: `mylibrary/book-detail/:bookId`,
  //     exact: true
  //   },
  //   {
  //     component: StatsPage,
  //     path: `reading-stats`,
  //     exact: true
  //   },
  // ]

  return (
   <Router>
      <Suspense fallback="loading...">
        <Switch>

            {/* All public routes */}
            <PublicRoute
              path='/login'
              exact
              isAuthenticated={isAuthenticated}
            >
              <LoginPage />
            </PublicRoute>

            <PublicRoute
              path="/register"
              exact
              isAuthenticated={isAuthenticated}
            >
              <SignupPage />
            </PublicRoute>

            {/* Redirect to route /login */}
            <PublicRoute
              path='/'
              exact
              isAuthenticated={isAuthenticated}
            >
              <Redirect
              to={{ pathname: '/login' }}
              />
            </PublicRoute>

            {/* Private routes */}
            {/* <PrivateRoute
              isAuthenticated={isAuthenticated}
            >
              {authedRoutes.map(({ component: Component, path, exact }) => (
                <Route
                  path={`/${path}`}
                  key={path}
                  exact={exact}
                >
                  <Component />
                </Route>
              ))}
            </PrivateRoute> */}
        </Switch>
      </Suspense>
   </Router>

  )
}


export default Routing