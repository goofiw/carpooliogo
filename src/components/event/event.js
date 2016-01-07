"use strict";

import React from 'react';
import Router from 'react-router';
import toastr from 'toastr';

import EventForm from './eventForm';
import EventActions from '../../actions/eventActions';
import EventStore from '../../stores/eventStore';
import AuthStore from '../../stores/authStore';

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

  setEventState: function(event) {
    this.setState({dirty: true});
    var field = event.target.name;
    var value = event.target.value;
    this.state.createEvent[field] = value;
    return this.setState({createEvent: this.state.createEvent});
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
    if (!this.eventFormIsValid()) {
      return;
    }
    this.state.createEvent.creator = AuthStore.getLoggedInUser();
    EventActions.createEvent(this.state.createEvent);
    this.setState({dirty: false});
    toastr.success("event saved.");
    this.transitionTo('/');
  },

  render: function() {
    console.log(this.state.createEvent)
    return (
      <div>
        <h1>Create Event</h1>
        <EventForm createEvent="ass"
            onChange={this.setEventState} 
            onSave={this.saveEvent}
            errors={this.state.errors} />
      </div>
    );
  }
});

module.exports = createEvent;