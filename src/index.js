import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
// import { Router, browserHistory } from 'react-router';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Routes from './routes';
import configureStore from './store/configureStore';
import { loadStocks } from './actions/stockActions';
import App from './components/App';

import './styles.scss';

const store = configureStore();
store.dispatch(loadStocks());

render(
  <Provider store={store}>
    <BrowserRouter> 
      <Routes />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
