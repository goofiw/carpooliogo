import Router from 'react-router';
import {Link, state} from 'react-router';
import $ from 'jquery';
import React from 'react';
import BaseComponent from '../common/baseComponent';
import EventActions from '../../actions/eventActions';
import RideStore from '../../stores/RideStore';


export default class extends BaseComponent {
    render() {
    console.log("ride taabbblleee");
        var rides = [
            {Driver: "tom", vehicle:"bicycle", departure: "noon", plane:"ride till dawn", spots: 45},
            {Driver: "tom", vehicle:"bicycle", departure: "noon", plane:"ride till dawn", spots: 45},
            {Driver: "tom", vehicle:"bicycle", departure: "noon", plane:"ride till dawn", spots: 45},
            {Driver: "tom", vehicle:"bicycle", departure: "noon", plane:"ride till dawn", spots: 45},
            ]
        return (
            <table id='example' cellSpacing='0' width='100%'>
                <thead>
                <tr>
                    {this.props.fields.map(field => (
                        <th>{field}</th>
                        ))}
                </tr>
                </thead>
                <tfoot>
                <tr>
                    {this.props.fields.map(function(field){
                        return (<th>{field}</th>);
                        })}
                    <th>Edit / Delete</th>
                </tr>
                </tfoot>
                <tbody>
                    {rides.map(ride => (
                        (
                            <tr>
                                 {this.props.fields.map(field => (
                                    <td>{ride[field]}</td>
                                 ))}
                                <td><Link to='#'>Request Spot</Link></td>
                            </tr>
                            )
                        ))}
                </tbody>
            </table>
        );
    }
}