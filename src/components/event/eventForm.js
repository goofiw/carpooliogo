"use strict";

import React from 'react';
import Input from '../common/textInput';

export default class extends React.Component {

  render() {
    return (
      <form>
        <h1>User Signup</h1>
        <Input
          name="name"
          label="name"
          onChange={this.props.onChange}
          value={this.props.createEvent.name} 
          error={this.props.errors.name}/>

        <Input 
          name="url"
          label="url"
          onChange={this.props.onChange}
          value={this.props.createEvent.url} 
          error={this.props.errors.url} />

        <input type="submit" value="Save" className="btn btn-default" onClick={this.props.onSave} />
      </form>
    );
  }
}

