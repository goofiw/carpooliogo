"use strict";

var React = require('react');
var Input = require('../common/textInput');

var signupForm = React.createClass({

  render: function() {
    return (
      <form>
        <h1>User Login</h1>
        <Input 
          name="phone"
          label="phone"
          onChange={this.props.onChange}
          value={this.props.user.phone} 
          error={this.props.errors.phone} />

        <Input 
          name="password"
          label="password"
          onChange={this.props.onChange}
          value={this.props.user.password} 
          error={this.props.errors.password} />

        <input type="submit" value="Login" className="btn btn-default" onClick={this.props.onLogin} />
      </form>
    );
  }
});

module.exports = signupForm;