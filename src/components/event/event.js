"use strict";

import React from 'react';
import Router from 'react-router';
import toastr from 'toastr';

import EventForm from './eventForm';
import EventActions from '../../actions/eventActions';
import EventStore from '../../stores/eventStore';

var createEvent = React.createClass({

  getInitialState: function() {
    return {
      createEvent: {name: '', url: ''},
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

  eventFormIsValid: function() {
    var formIsValid = true;
    this.state.errors = {}; //clears previous errors

    if (this.state.createEvent.name.length < 3) {
      formIsValid = false;
      this.state.errors.name = "Name must be at least 3 chars";
    }

    this.setState({errors: this.state.errors});
    return formIsValid;
  },

  saveEvent: function(event) {
    event.preventDefault();
    if (!this.userFormIsValid()) {
      return;
    }
    EventActions.createEvent(this.state.createEvent);
    this.setState({dirty: false});
    toastr.success("user saved.");
    this.transitionTo('/');
  },

  render: function() {
    console.log(this.state.createEvent)
    return (
      <div>
        <h1>Create Event</h1>
        <EventForm createEvent="ass"
            onChange={this.setUserState} 
            onSave={this.saveEvent}
            errors={this.state.errors} />
      </div>
    );
  }
});

module.exports = createEvent;