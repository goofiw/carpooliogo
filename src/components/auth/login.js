"use strict";

var React = require('react');
var Router = require('react-router');
var toastr = require('toastr');

var LoginForm = require('./loginForm');
var AuthActions = require('../../actions/authActions');
var UserStore = require('../../stores/authStore');

var login = React.createClass({

  getInitialState: function() {
    return {
      user: {phone: '', password: '' },
      errors: {},
      dirty: false,
    };

  },
  loginUser: function(){
    AuthActions.login(this.state.user);
  },
  setUserState: function(event) {
    this.setState({dirty: true});
    var field = event.target.name;
    var value = event.target.value;
    this.state.user[field] = value;
    return this.setState({user: this.state.user});
  },

  userFormIsValid: function() {
    var formIsValid = true;
    this.state.errors = {}; //clears previous errors
    this.setState({errors: this.state.errors});
    return formIsValid;
  },

  render: function() {
    console.log(this.state.user)
    return (
      <LoginForm user={this.state.user}
          onChange={this.setUserState} 
          onLogin={this.loginUser} 
          errors={this.state.errors} />
    );
  }
});

module.exports = login;