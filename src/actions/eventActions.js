"use strict";

import Dispatcher from '../dispatcher/appDispatcher';
import EventApi from '../api/EventApi';
import ActionTypes from '../constants/actionTypes';

var eventActions = {
  createEvent: function(details) {
    EventApi.createEvent(details);
  },
};

module.exports = eventActions;

