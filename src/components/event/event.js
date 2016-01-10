import Router from 'react-router';
import {Link, state} from 'react-router';
import $ from 'jquery';
import React from 'react';
import BaseComponent from '../common/baseComponent';
import RideComponent from '../ride/rideTable';
import EventActions from '../../actions/eventActions';
import RideStore from '../../stores/rideStore';

export default class extends BaseComponent {
    constructor(props) {
      super(props)
      this.state = {
        rides: RideStore.getRides(this.props.params.eventid),
        eventId: this.props.params.eventid
      }
      console.log(this.props.params.eventid)
      this._bind('_onRidesChange');
      RideStore.addChangeListener(this._onRidesChange);
    }

    componentDidMount() {
        EventActions.getRides(this.state.eventId);

    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
        RideStore.removeChangeListener(this._onRidesChange);
    }

    _onRidesChange() {
        this.setState({rides: RideStore.getRides(this.state.eventId)});
    }

    render() {
        var rides = this.state.rides || [];
        var fields = ['Driver', 'vehicle', 'departure info', 'plan', 'spots'];

        return (
            <RideComponent fields={fields}
              rides = {rides}/>
        )
    }
}

