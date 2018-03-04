import React, { Component } from 'react';
import Button from './Button'; // Import a component from another file

class DangerButton extends Component {
  render() {
    return <Button style={{ color: 'red' }} value="Warning" />;
  }
}

export default DangerButton;