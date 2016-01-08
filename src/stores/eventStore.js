"use strict";

import Dispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/actionTypes';
import {EventEmitter} from 'events';
import assign from 'object-assign';
import _ from 'lodash';

var _loggedInUser = {}; 

var EventStore = assign({}, EventEmitter.prototype, {
  addChangeListener: function(callback) {
    this.on('change', callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  },
  emitChange: function() {
    this.emit('change');
  },
  getLoggedInUser: function() {
    return _loggedInUser;
  },
  setLoggedInUser: function(name) {
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
  EventStore.emitChange();//call after changes are made so components know
});

module.exports = EventStore;