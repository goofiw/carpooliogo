"use strict";

import Dispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/actionTypes';
import {EventEmitter} from 'events';
import assign from 'object-assign';
import _ from 'lodash';

var _rides = [];

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
  getRides: function(eventId) {
    return _rides;
  },

});

Dispatcher.register(function(action) {
  switch(action.actionType) {
    case ActionTypes.RIDES_RECIEVED:
      _rides = action.rides;
      break;
  }
    EventStore.emitChange();//call after changes are made so components know
});

module.exports = EventStore;