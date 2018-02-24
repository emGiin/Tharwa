import React, { Component } from 'react';

class Button extends Component {
  render() {
    return (
      <button style={this.props.style} onClick={this.click.bind(this)}>{this.props.value}</button>
    );
  }

  click() {
    console.log('clicked me', this);
  }
}

export default Button; // Don’t forget to use export default!