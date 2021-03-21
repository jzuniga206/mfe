import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';

// called by container app to inject app into container
// @initialPath: memory history by default starts at root directory '/'
// initialPath will be defined by container history to let auth know that begin its nav
// starting at the path the container is showing it at ("/auth/signin or /auth/signup")
// since auth doesnt have a "/" route defined, it needs to know whats already in url
const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
  // memory history listener will call any callback passed into it anytime navigation occurs
  // use default history (browser history) in dev env
  const history =
    defaultHistory || createMemoryHistory({ initialEntries: [initialPath] });
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
  const devRoot = document.querySelector('#_auth-dev-root');

  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

export { mount };
