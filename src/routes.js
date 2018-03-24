import React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from './components/App';
import AboutPage from './components/about/AboutPage';


const Routes = () => (
  <main>
    <Switch>
      <Route path="/" component={App} />
    </Switch>
  </main>
);

export default Routes;