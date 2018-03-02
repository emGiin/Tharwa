import React, { Component } from "react";
import { Input, Button } from "antd";

class PinForm extends Component {
  state = {
    pin: null
  };
  render() {
    return (
      <div className="loginForm">
        <p>Insérer le code pin</p>
        <br />
        <Input
          style={{
            marginTop: "1em",
            maxWidth: 100
          }}
          size="large"
          maxLength="4"
          placeholder="Code pin"
          onChange={this.onPinChange.bind(this)}
        />
        <Button
          type="primary"
          className="primaryAction"
          onClick={this.done.bind(this)}
        >
          Done
          {this.pin}
        </Button>
      </div>
    );
  }

  onPinChange(e) {
    const { value } = e.target;
    this.setState({ pin: value });
  }

  done() {
    const pin = this.state.pin
    console.log(`Pin entred ${pin}`);
    this.props.onNext(pin);
  }
}

export default PinForm;
