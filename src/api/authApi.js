"use strict";

//This file is mocking a web API by hitting hard coded data.
import _ from 'lodash';
import $ from 'jquery';

import Dispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/actionTypes';


var AuthApi = {
  login: function(data) {
    $.ajax({
      url: "/api/login",
      method: "POST",
      data: JSON.stringify(data),
      contentType: "application/json"
    })
    .success(function(data) {
      localStorage.setItem('jwt', data.jwt);
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
    })
  },
  checkToken: function() {
    var jwt = localStorage.getItem("jwt");
    if (typeof jwt !== "string") {
      return null;
    } else {
      $.ajax({
        url: "/api/authcheck",
        method: "GET",
        headers: {authorization: jwt}
      })
      .success(function(data) {
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

module.exports = AuthApi;