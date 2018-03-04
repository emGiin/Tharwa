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
          onKeyPress={ (event) =>  {            
            const charCode = (event.which) ? event.which : event.keyCode
            console.log(charCode);
            if (!(charCode > 31 && (charCode < 48 || charCode > 57))) return true;
            event.preventDefault();
            return false;
          }}
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
    const reg = /[0-9]{4}/;
    if ((!isNaN(value) && reg.test(value)) || value === '' ) {
      this.setState({ pin: value });
    }
  }

  done() {
    const pin = this.state.pin
    console.log(`Pin entred ${pin}`);
    this.props.onNext(pin);
  }
}

export default PinForm;
