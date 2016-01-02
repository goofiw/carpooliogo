"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var UserApi = require('../api/userApi');
var ActionTypes = require('../constants/actionTypes');

var AuthorActions = {
  createUser: function(user) {
    var newUser = UserApi.signup(user);

    //tells all the stores that a new author was created
    Dispatcher.dispatch({
      actionType: ActionTypes.CREATE_USER,
      author: newUser,
    });
  },
  updateAuthor: function(author) {
    var updatedAuthor = AuthorApi.saveAuthor(author);

    //tells all the stores that a new author was created
    Dispatcher.dispatch({
      actionType: ActionTypes.UPDATE_AUTHOR,
      author: updatedAuthor,
    });
  },
  deleteAuthor: function(id) {
    AuthorApi.deleteAuthor(id);

    //tells all the stores that a new author was created
    Dispatcher.dispatch({
      actionType: ActionTypes.Delete_AUTHOR,
      id: id,
    });
  }
};

module.exports = AuthorActions;