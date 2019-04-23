import React from 'react'
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app.jsx';
import ScrollToTop from './components/container/scrollToTop/scrollToTop.jsx';

render((
  <BrowserRouter>
    <ScrollToTop>
      <App />
    </ScrollToTop>
  </BrowserRouter>
), document.getElementById('app'));