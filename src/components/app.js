import $ from 'jquery';

import React from 'react';

import Header from './common/header';
import InitializeActions from '../actions/initializeActions';

var App = React.createClass({
  componentDidMount: function() {
    InitializeActions.initialize();
  },
  render: function(){
    return (
        <div>
          <Header />
          <div className="container-fluid">
            {this.props.children}
          </div>
        </div>
      );
  }
})


module.exports = App;