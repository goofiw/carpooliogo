"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var AuthApi = require('../api/authApi');
var ActionTypes = require('../constants/actionTypes');

var AuthActions = {
  createUser: function(user) {
    AuthApi.signup(user);
  },
  createUserResponse: function(reponse) {
    Dispatcher.dispatch({
      actionType: ActionTypes.USER_CREATED,
      user: response
    });
  },
  login: function(data) {
    AuthApi.login(data);
  },
  loginResponse: function(user) {
    if(user.jwt) {
      Dispatcher.dispatch({
        actionType: ActionTypes.LOGIN_RESPONSE,
        user: user.name
      })
    }
  },
  logout: function() {
    localStorage.removeItem('jwt');
    Dispatcher.dispatch({
      actionType: ActionTypes.LOGOUT_USER
    });
  },
  checkToken: function() {
    var token = localStorage.getItem('jwt');
    AuthApi.checkToken(token);
  },
  receivedUser: function(user) {
    Dispatcher.dispatch({
      actionType: ActionTypes.USER_LOGGED_IN,
      user: user 
    });
  }
};

module.exports = AuthActions;

