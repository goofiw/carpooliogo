"use strict";

import React from 'react';
import Router from 'react-router';
import toastr from 'toastr';
import phone from 'phone';
import LoginForm from './loginForm';
import AuthActions from '../../actions/authActions';
import UserStore from '../../stores/authStore';

var login = React.createClass({
  getInitialState: function() {
    return {
      user: {phone: '', password: '' },
      errors: {},
      dirty: false,
    };

  },
  loginUser: function(event){
    event.preventDefault();
    var confirmedPhone = phone(this.state.user.phone, "US");
    if (confirmedPhone.length != 0) {
      this.state.user.phone = confirmedPhone[0];
    }
    AuthActions.login(this.state.user);
    // this.context.router.transitionTo('/');

    // this.history.pushState(null, '/event', query);
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