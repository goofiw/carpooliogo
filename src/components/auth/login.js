"use strict";

var React = require('react');
var Router = require('react-router');
var toastr = require('toastr');
var phone = require('phone');
var LoginForm = require('./loginForm');
var AuthActions = require('../../actions/authActions');
var UserStore = require('../../stores/authStore');

var login = React.createClass({
  mixins: [History],
  getInitialState: function() {
    return {
      user: {phone: '', password: '' },
      errors: {},
      dirty: false,
    };

  },
  loginUser: function(){
    var confirmedPhone = phone(this.state.user.phone, "US");
    if (confirmedPhone.length != 0) {
      this.state.user.phone = confirmedPhone[0];
    }
    AuthActions.login(this.state.user);
    this.history.pushState(null, `/event`, query);
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