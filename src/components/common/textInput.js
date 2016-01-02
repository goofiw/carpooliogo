"use strict";

var React = require('react');

var Input = React.createClass({
  //not all just examples
  propTypes: {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired
  },
  render: function() {
    var wrapperClass = 'form-group';
    if (this.props.error && this.props.error.length >0) {
      wrapperClass += " " + "has-error";
    }
    return (
      <div className={wrapperClass}>
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <div className="field">
          <input type={this.props.name === "password" ? "password" :"text"}
            name={this.props.name}
            className="form-control"
            placeholder={this.props.placeholder}
            ref={this.props.name}
            value={this.props.value}
            onChange={this.props.onChange} />
          <div className="input">{this.props.error}</div>
        </div>
      </div>
    );
  }
});

module.exports = Input;