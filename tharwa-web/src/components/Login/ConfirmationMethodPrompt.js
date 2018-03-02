import React, { Component } from "react";
import { Radio, Button } from "antd";
const RadioGroup = Radio.Group;

class ConfirmationMethodPrompt extends Component {
  state = {
    value: 1
  };
  onChange = e => {
    console.log("radio checked", e.target.value);
    this.setState({
      value: e.target.value
    });
  };
  render() {
    return (
      <div>
        <p>Veuillez choisir comment vous recevez le code pin.</p>
        <RadioGroup
          style={{ marginTop: "3em" }}
          onChange={this.onChange}
          value={this.state.value}
        >
          <Radio value={1}>Mail</Radio>
          <Radio value={2}>SMS</Radio>
          {/* <Radio value={3}>J'ai déjà un code pin</Radio> */}
        </RadioGroup>
        <Button
          type="primary"
          className="primaryAction"
          onClick={()=>this.props.onNext(this.state.value)}
        >
          Next
        </Button>
      </div>
    );
  }
}

export default ConfirmationMethodPrompt;
