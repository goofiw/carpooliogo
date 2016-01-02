"use strict";

var React = require('react');
var Router = require('react-router');
var toastr = require('toastr');

var UserForm = require('./signupForm');
var UserActions = require('../../actions/userActions');
var UserStore = require('../../stores/userStore');

var signup = React.createClass({
  mixins: [
    Router.Navigation, Router.state
  ],

  statics: {
    willTransitionFrom: function(transition, component) {
      if (component.state.dirty && !confirm('Leave without saving?')) {
        transition.abort();
      } 
    }
  },
  getInitialState: function() {
    return {
      user: {name: '', phone: '', password: '' },
      errors: {},
      dirty: false,
    };

  },

  componentWillMount: function() {// calls before the componentn mounted
  },

  setUserState: function(event) {
    this.setState({dirty: true});
    var field = event.target.name;
    var value = event.target.value;
    this.state.user[field] = value;
    return this.setState({user: this.state.user});
  },

  userFormIsValid: function() {
    var formIsValid = true;
    this.state.errors = {}; //clears previous errors

    if (this.state.user.name.length < 3) {
      formIsValid = false;
      this.state.errors.name = "Name must be at least 3 chars";
    }

    this.setState({errors: this.state.errors});
    return formIsValid;
  },

  saveUser: function(event) {
    event.preventDefault();
    if (!this.userFormIsValid()) {
      return;
    }
    if(this.state.user.id) {
      UserActions.updateUser(this.state.user);
    } else {
      UserActions.createUser(this.state.user);
    }
    this.setState({dirty: false});
    toastr.success("user saved.");
    this.transitionTo('/');
  },

  render: function() {
    console.log(this.state.user)
    return (
      <UserForm user="ass"
          onChange={this.setUserState} 
          onSave={this.saveUser} 
          errors={this.state.errors} />
    );
  }
});

module.exports = signup;