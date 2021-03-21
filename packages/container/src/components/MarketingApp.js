import React, { useRef, useEffect } from 'react';
import { mount } from 'marketing/MarketingApp'; // maps to the 'exposes' obj in marketing webpack config
import { useHistory } from 'react-router-dom';

/*
  This function can render any application that injects itself into the DOM (React, Vue, Angular, etc)
*/
export default () => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      // syncrhonize the browser router history every time memory history changes path
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location;

        // prevent infinite loop of redirects
        if (pathname !== nextPathname) history.push(nextPathname);
      },
    });
    // anytime theres a change to parent history, invoke the parents callback
    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />;
};
