import {Link, state} from 'react-router';
import $ from 'jquery';
import React from 'react';
import BaseComponent from '../common/baseComponent';
import EventActions from '../../actions/eventActions';
import EventStore from '../../stores/eventStore';

export default class extends BaseComponent {
    constructor(props) {
      super(props)
      this.state = {
        events: EventStore.getEvents()
      }
      this._bind('_onEventsChange');
      EventStore.addChangeListener(this._onEventsChange);
    }

    componentDidMount() {
        EventActions.getEvents();
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
        EventStore.removeChangeListener(this._onEventsChange);
    }

    _onEventsChange() {
        this.setState({events: EventStore.getEvents()});
    }


    render() {
        var entries = this.state.events || [];
        var fields = ['name', 'url', 'id'];
        return (
            <table id='example' cellSpacing='0' width='100%'>
                <thead>
                <tr>
                    {fields.map(function(field){
                        return (<th>{field}</th>);
                        })}
                    <th>Edit / Delete</th>
                </tr>
                </thead>
                <tfoot>
                <tr>
                    {fields.map(function(field){
                        return (<th>{field}</th>);
                        })}
                    <th>Edit / Delete</th>
                </tr>
                </tfoot>
                <tbody>
                    {entries.map(entry => (
                        (
                            <tr>
                                 {fields.map(field => (
                                    <td>{entry[field]}</td>
                                 ))}
                                <td key={entry.id}><Link to={`event/${entry.id}`}>View Rides</Link></td>
                            </tr>
                            )
                        ))}
                </tbody>
            </table>
        );
    }
}

