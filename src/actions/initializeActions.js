"use strict";

import Dispatcher from '../dispatcher/appDispatcher';
import AuthApi from '../api/authApi';
import ActionTypes from '../constants/actionTypes';

var InitializeActions = {
  initialize: function() {
    AuthApi.checkToken();
  }
};

module.exports = InitializeActions;