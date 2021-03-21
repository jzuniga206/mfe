import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles';

import Landing from './components/Landing';
import Pricing from './components/Pricing';

// class names generated at build time will have a 'ma' prefix to avoid namespace collision
const generateClassName = createGenerateClassName({
  productionPrefix: 'ma',
});

function App() {
  return (
    <StylesProvider generateClassName={generateClassName}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/pricing" component={Pricing} />
          <Route path="/" component={Landing} />
        </Switch>
      </BrowserRouter>
    </StylesProvider>
  );
}

export default App;
