"use strict";
import React from 'react';
import Router from 'react-router';
import toastr from 'toastr';
import phone from 'phone';
import LoginForm from './loginForm';
import AuthActions from '../../actions/authActions';
import UserStore from '../../stores/authStore';
import {History} from 'history';
import BaseComponent from '../common/baseComponent';

class login extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        phone: '',
        password: '',
      },
      errors: {}
    }
    this._bind('_loginUser', '_setUserState');
  }

  _loginUser(event)  {

    event.preventDefault();
    var confirmedPhone = phone(this.state.user.phone, "US");
    if (confirmedPhone.length != 0) {
      this.state.user.phone = confirmedPhone[0];
    }
    // AuthActions.login(this.state.user);
    // this.context.router.transitionTo('/');
    console.log(this, '\n', this.history, '\n', this.context)
    this.context.history.pushState(null, '/event');
  }
  _setUserState(event) {
    event.preventDefault();
    this.setState({dirty: true});
    var field = event.target.name;
    var value = event.target.value;
    this.state.user[field] = value;
    return this.setState({user: this.state.user});
  }

  userFormIsValid() {
    var formIsValid = true;
    this.state.errors = {}; //clears previous errors
    this.setState({errors: this.state.errors});
    return formIsValid;
  }

  render() {
    console.log(this.state.user)
    return (
      <LoginForm user={this.state.user}
          onChange={this._setUserState} 
          onLogin={this._loginUser} 
          errors={this.state.errors} />
    );
  }
}

login.contextTypes = {
    history: React.PropTypes.object
};

module.exports = login;