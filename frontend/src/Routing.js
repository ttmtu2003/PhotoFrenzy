import { lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

// routes
import PrivateRoute from './PrivateRoute.js'
import PublicRoute from './PublicRoute.js'

// pages
const LoginPage = lazy(() => import('./pages/LoginPage/index.js'))
const SignupPage = lazy(() => import('./pages/SignupPage/index.js'))
const HomePage = lazy(() => import('./pages/HomePage/index.js'))
const ProfilePage = lazy(() => import('./pages/ProfilePage/index.js'))
const PostPhotoPage = lazy(() => import('./pages/PostPhotoPage/index.js'))
const OtherProfilePage = lazy(() => import('./pages/OtherProfilePage/index.js'))
const SettingPage = lazy(() => import('./pages/SettingPage/index.js'))

function Routing({ isAuthenticated }) {
  // authenticated routes 
  const authedRoutes = [
    {
      component: HomePage,
      path: 'explore',
      exact: true
    },
    {
      component: ProfilePage,
      path: 'profile',
      exact: true
    },
    {
      component: PostPhotoPage,
      path: 'post-photo',
      exact: true
    },
    {
      component: OtherProfilePage,
      path: 'users/:id',
      exact: true
    },
    {
      component: SettingPage,
      path: 'setting',
      exact: true
    },
  ]

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
            <PrivateRoute
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
            </PrivateRoute>
        </Switch>
      </Suspense>
   </Router>

  )
}


export default Routing