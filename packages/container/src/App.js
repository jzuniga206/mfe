import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles';

import Header from './components/Header';
import AuthApp from './components/AuthApp';
import MarketingApp from './components/MarketingApp';

// class names generated at build time will have a 'ma' prefix to avoid namespace collision
const generateClassName = createGenerateClassName({
  productionPrefix: 'co',
});

export default () => {
  return (
    <StylesProvider generateClassName={generateClassName}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/auth" component={AuthApp} />
          <Route path="/" component={MarketingApp} />
        </Switch>
      </BrowserRouter>
    </StylesProvider>
  );
};
