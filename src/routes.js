
import React from 'react';

import {Router, Route, Link} from 'react-router';
import {render} from 'react-dom';
import {createHistory} from 'history';

var history = createHistory();

render((
  <Router history={history}>
    <Route path="/" component={require('./components/app')}>
      <Route path="signup" component={require('./components/auth/signup')} />
      <Route path="login" component={require('./components/auth/login')} />
      <Route path="event" component={require('./components/event/event')} />
    </Route>
  </Router>
), document.getElementById("app"));

