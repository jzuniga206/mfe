import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';

// called by container app to inject marketing into container
const mount = (el, { onNavigate, defaultHistory }) => {
  // memory history listener will call any callback passed into it anytime navigation occurs
  // use default history (browser history) in dev env
  const history = defaultHistory || createMemoryHistory();
  if (onNavigate) history.listen(onNavigate);

  ReactDOM.render(<App history={history} />, el);

  return {
    onParentNavigate: ({ pathname: nextPathname }) => {
      const { pathname } = history.location;
      if (pathname !== nextPathname) history.push(nextPathname);
    },
  };
};

if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_marketing-dev-root');

  if (devRoot) {
    // running marketing in isolation should run in browser history, not memory history
    // otherwise devs wont be able to see pathname changes in development
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

export { mount };
