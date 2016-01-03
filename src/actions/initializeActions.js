"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var AuthApi = require('../api/authApi');
var ActionTypes = require('../constants/actionTypes');

var InitializeActions = {
  initialize: function() {
    AuthApi.checkToken();
  }
};

module.exports = InitializeActions;