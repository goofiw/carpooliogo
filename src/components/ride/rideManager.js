"use strict";

import React from 'react';
import Router from 'react-router';
import toastr from 'toastr';
import {History} from 'history';
import BaseComponent from '../common/baseComponent';

import RideForm from './rideForm';
import EventActions from '../../actions/eventActions';
import AuthStore from '../../stores/authStore';

class RideManager extends BaseComponent {

  constructor(props) {
    super(props)
    this.state = {
      ride: {creator: '', vehicle: '', event: this.props.params.eventid},
      errors: {},
      dirty: false,
    };
    this._bind('setObjectState', 'saveObject', 'formIsValid');
  }

  setObjectState(event) {
    this.setState({dirty: true});
    var field = event.target.name;
    var value = event.target.value;
    this.state.ride[field] = value;
    return this.setState({ride: this.state.ride});
  }

  formIsValid() {
    var formIsValid = true;
    this.state.errors = {}; //clears previous errors

    if (this.state.ride.name.length < 3) {
      formIsValid = false;
      this.state.errors.name = "Name must be at least 3 chars";
    }

    this.setState({errors: this.state.errors});
    return formIsValid;
  }

  saveObject(event) {
    event.preventDefault();
    if (!this.formIsValid()) {
      return;
    }
    this.state.ride.creator = AuthStore.getLoggedInUser();
    EventActions.ride(this.state.ride);
    this.setState({dirty: false});
    toastr.success("event saved.");
    this.context.history.pushState(null, '/event/' + this.state.ride.eventId);
  }

  render() {
    console.log(this.state.ride)
    return (
      <div>
        <h1>Create Event</h1>
        <RideForm ride="ass"
            onChange={this.setObjectState} 
            onSave={this.saveObject}
            errors={this.state.errors} />
      </div>
    );
  }
}

RideManager.contextTypes = {
    history: React.PropTypes.object
};

export default RideManager