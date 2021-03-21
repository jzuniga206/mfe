import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Route, Switch, Router, Redirect } from 'react-router-dom';
import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles';
import { createBrowserHistory } from 'history';

import Header from './components/Header';
import Progress from './components/Progress';

const AuthApp = lazy(() => import('./components/AuthApp'));
const DashboardApp = lazy(() => import('./components/DashboardApp'));
const MarketingApp = lazy(() => import('./components/MarketingApp'));

// class names generated at build time will have a 'ma' prefix to avoid namespace collision
const generateClassName = createGenerateClassName({
  productionPrefix: 'co',
});

// creating our own browser history for redirect on login
const history = createBrowserHistory();

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    // redirect user sign in
    if (isSignedIn) {
      history.push('/dashboard');
    }
  }, [isSignedIn]);

  return (
    <StylesProvider generateClassName={generateClassName}>
      <Router history={history}>
        <Header
          isSignedIn={isSignedIn}
          onSignOut={() => setIsSignedIn(false)}
        />
        <Suspense fallback={<Progress />}>
          <Switch>
            <Route path="/auth">
              <AuthApp onSignIn={() => setIsSignedIn(true)} />
            </Route>
            <Route path="/dashboard">
              {!isSignedIn && <Redirect to="/" />}
              <DashboardApp />
            </Route>
            <Route path="/" component={MarketingApp} />
          </Switch>
        </Suspense>
      </Router>
    </StylesProvider>
  );
};
