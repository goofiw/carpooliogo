"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');

var _loggedInUser = {}; 

var AuthStore = assign({}, EventEmitter.prototype, {
  addChangeListener: function(callback) {
    this.on('change', callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  },
  emitChange: function() {
    console.log('user store changed');
    this.emit('change');
  },
  getLoggedInUser: function() {
    return _loggedInUser;
  },
  setLoggedInUser: function(name) {
    console.log(name)
    _loggedInUser = name;
  }
});

Dispatcher.register(function(action) {
  switch(action.actionType) {
    case ActionTypes.USER_LOGGED_IN:
      _loggedInUser = action.user;
      break;
    case ActionTypes.CREATE_AUTHOR:
      _authors.push(action.author);
      break;
    case ActionTypes.LOGOUT_USER:
      _loggedInUser = false;
      break;
  }
  AuthStore.emitChange();//call after changes are made so components know
});

module.exports = AuthStore;