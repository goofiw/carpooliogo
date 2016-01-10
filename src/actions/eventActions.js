"use strict";

import Dispatcher from '../dispatcher/appDispatcher';
import EventApi from '../api/EventApi';
import ActionTypes from '../constants/actionTypes';

module.exports = {
  createEvent: function(details) {
    EventApi.createEvent(details);
  },

  getEvents: function() {
    EventApi.getEvents();
  },

  getRides: function(eventId) {
    EventApi.getRides(eventId);
  }

};


