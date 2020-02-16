import React from 'react';
import { Router } from '@reach/router';

import Home from './Home';
import NotFound from './NotFound';
import Constructor from './Constructor';
import Checkout from './Checkout';

const Routes = () => (
  <Router style={{ height: '100%' }}>
    <Home path='/' />
    <Constructor path='/constructor' />
    <Checkout path='/checkout' />
    <NotFound default />
  </Router>
);

export default Routes;
