"use strict";

import Dispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/actionTypes';
import {EventEmitter} from 'events';
import assign from 'object-assign';
import _ from 'lodash';

var _events = [];

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
  getEvents: function() {
    return _events;
  },
});

Dispatcher.register(function(action) {
  switch(action.actionType) {
    case ActionTypes.EVENTS_RECIEVED:
      _events = action.events;
      break;
  }
    EventStore.emitChange();//call after changes are made so components know
    console.log(_events)
});

module.exports = EventStore;