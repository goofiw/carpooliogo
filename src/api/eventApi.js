"use strict";

//This file is mocking a web API by hitting hard coded data.
import _ from 'lodash';
import $ from 'jquery';

import Dispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/actionTypes';


module.exports = {
  createEvent: function(data) {
    $.ajax({
      url: "/api/createevent",
      method: "POST",
      data: JSON.stringify(data),
      contentType: "application/json"
    })
    .success(function(data) {
      console.log("successful post", data)
      if(data.url) {
        Dispatcher.dispatch({
          actionType: ActionTypes.EVENT_CREATED,
          newEvent: data
        })
      }      
    })
    .error(function(err) {
      throw err;
    })
  },

  getEvents: function() {
    $.ajax({
      url: "/api/events",
      method: "GET",
    })
    .success(function(data) {
      Dispatcher.dispatch({
        actionType: ActionTypes.EVENTS_RECIEVED,
        events: data
      });
    })
    .error(function(err) {
      throw err;
    })
  }
};

