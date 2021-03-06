/*eslint-disable import/default */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';
import configureStore from './store/configureStore';
import { loadStocks } from './actions/stockActions';
import App from './components/App';

import '../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap-sprockets.scss';
import '../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import '../node_modules/toastr/toastr.scss';
import './sass/main.scss';

const store = configureStore();
store.dispatch(loadStocks());

// if (process.env.NODE_ENV !== 'production') {
//   const { whyDidYouUpdate } = require('why-did-you-update');
//   whyDidYouUpdate(React);
// }

render(
  <Provider store={store}>
    <BrowserRouter> 
      <Routes />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
