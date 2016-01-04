"use strict";

var React = require('react');
var Router = require('react-router');
var toastr = require('toastr');
var phone = require('phone');

var UserForm = require('./signupForm');
var AuthActions = require('../../actions/authActions');
var AuthStore = require('../../stores/authStore');

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
    var confirmedPhone = phone(this.state.user.phone, "US");
    if (confirmedPhone.length == 0) {
      formIsValid = false;
      this.state.errors.phone = "Please enter a valid U.S. 10 digit number";
    } else { 
      this.state.user.phone = confirmedPhone[0];
    }

    this.setState({errors: this.state.errors});
    return formIsValid;
  },

  saveUser: function(event) {
    event.preventDefault();
    if (!this.userFormIsValid()) {
      return;
    }
    AuthActions.createUser(this.state.user);
    this.setState({dirty: false});
    toastr.success("user saved.");
    this.context.router.transitionTo('/');
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