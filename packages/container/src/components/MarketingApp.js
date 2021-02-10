import React, { useRef, useEffect } from 'react';
import { mount } from 'marketing/MarketingApp'; // maps to the 'exposes' obj in marketing webpack config

/*
  This function can render any application that injects itself into the DOM (React, Vue, Angular, etc)
*/
export default () => {
  const ref = useRef(null);

  useEffect(() => {
    mount(ref.current);
  }, []);

  return <div ref={ref} />;
};