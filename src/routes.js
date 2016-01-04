"use strict";

var React = require('react');

var Router = require('react-router').Router
var Route = require('react-router').Route
var Link = require('react-router').Link
var render = require('react-dom').render
var createHistory = require('history').createHistory();

render((
  <Router history={createHistory}>
    <Route path="/" component={require('./components/app')}>
      <Route path="signup" component={require('./components/auth/signup')} />
      <Route path="login" component={require('./components/auth/login')} />
      <Route path="event" componenet={require('./components/event/event')} />
    </Route>
  </Router>
), document.getElementById("app"));

