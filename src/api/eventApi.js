"use strict";

//This file is mocking a web API by hitting hard coded data.
import _ from 'lodash';

import Dispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/actionTypes';


var EventApi = {
  login: function(data) {
    $.ajax({
      url: "/api/login",
      method: "POST",
      data: JSON.stringify(data),
      contentType: "application/json"
    })
    .success(function(data) {
      localStorage.setItem('jwt', data.jwt);
      console.log("successful post", data)
      if(data.jwt) {
        Dispatcher.dispatch({
          actionType: ActionTypes.USER_LOGGED_IN,
          user: data.name
        })
      }      
    })
  },
  signup: function(data) {
    $.ajax({
      url: "/api/signup",
      method: "POST",
      data: JSON.stringify(data),
      contentType: "application/json"
    })
    .success(function(data) {
      localStorage.setItem('jwt', data.jwt);
      console.log("successful post", data)
    })
  },
  checkToken: function() {
    var jwt = localStorage.getItem("jwt");
    if (typeof jwt !== "string") {
      console.log("jwt", jwt, typeof jwt)
      return null;
    } else {
      $.ajax({
        url: "/api/authcheck",
        method: "GET",
        headers: {authorization: jwt}
      })
      .success(function(data) {
        console.log("data from check token", data);
        if(data.user) {
          Dispatcher.dispatch({
            actionType: ActionTypes.USER_LOGGED_IN,
            user: data.user
          })
        }        
      })
    }
  }
  
};

module.exports = EventApi;