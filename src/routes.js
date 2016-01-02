"use strict";

var React = require('react');

var Router = require('react-router').Router
var Route = require('react-router').Route
var Link = require('react-router').Link
var render = require('react-dom').render
var browserHistory = require('react-router').browserHistory

render((
  <Router history={browserHistory}>
    <Route path="/" component={require('./components/app')}>
      <Route path="signup" component={require('./components/auth/signup')} />
      <Route path="login" component={require('./components/auth/login')} />
    </Route>
  </Router>
), document.getElementById("app"));

