"use strict";

var React = require('react');
var Router = require('react-router');
var toastr = require('toastr');

var LoginForm = require('./loginForm');
var UserActions = require('../../actions/userActions');
var UserStore = require('../../stores/userStore');

var login = React.createClass({
  mixins: [
    Router.Navigation, Router.state
  ],

  getInitialState: function() {
    return {
      user: {phone: '', password: '' },
      errors: {},
      dirty: false,
    };

  },

  componentWillMount: function() {// calls before the componentn mounted
  },
  loginUser: function(){
    UserActions.login(this.state.user);
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