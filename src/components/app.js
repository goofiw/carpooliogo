$ = jQuery = require('jquery');

var React = require('react')

var Header = require('./common/header');
var InitializeActions = require('../actions/initializeActions');

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