"use strict";
import React from 'react';
import Router from 'react-router';
import toastr from 'toastr';
import phone from 'phone';
import LoginForm from './loginForm';
import AuthActions from '../../actions/authActions';
import AuthStore from '../../stores/authStore';
import {History} from 'history';
import BaseComponent from '../common/baseComponent';

class login extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        phone: '',
        password: ''
      },
      errors: {}
    }
    this._bind('_loginUser', '_setUserState', '_onAuthChange');
    AuthStore.addChangeListener(this._onAuthChange);
  }

  _loginUser(event)  {

    event.preventDefault();
    var confirmedPhone = phone(this.state.user.phone, "US");
    if (confirmedPhone.length != 0) {
      this.state.user.phone = confirmedPhone[0];
    }
    AuthActions.login(this.state.user);
    console.log(this, '\n', this.history, '\n', this.context)
  }
  _setUserState(event) {
    event.preventDefault();
    this.setState({dirty: true});
    var field = event.target.name;
    var value = event.target.value;
    this.state.user[field] = value;
    return this.setState({user: this.state.user});
  }

  componentWillUnmount() {
    AuthStore.removeChangeListener(this._onAuthChange);
  }

  userFormIsValid() {
    var formIsValid = true;
    this.state.errors = {}; //clears previous errors
    this.setState({errors: this.state.errors});
    return formIsValid;
  }

  _onAuthChange() {
    var loggedInUser = AuthStore.getLoggedInUser();
    if (loggedInUser) {
      this.context.history.pushState(null, '/');
    }
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