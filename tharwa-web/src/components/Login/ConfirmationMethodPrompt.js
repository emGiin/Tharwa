import React, { Component } from "react";
import { Radio, Button } from "antd";
const RadioGroup = Radio.Group;

class ConfirmationMethodPrompt extends Component {
  state = {
    choice: 'email'
  };
  render() {
    return (
      <div>
        <p>Veuillez choisir comment vous recevez le code pin.</p>
        <RadioGroup
          style={{ marginTop: "3em" }}
          onChange={this.onChange}
          value={this.state.choice}
          >
          <Radio value={"email"} >Mail</Radio>
          <Radio value={"sms"}>SMS</Radio>
          {/* <Radio value={3}>J'ai déjà un code pin</Radio> */}
        </RadioGroup>
        <Button
          type="primary"
          className="primaryAction"
          onClick={()=>this.props.onNext(this.state.choice)}
          >
          Suivant
        </Button>
      </div>
    );
  }
  onChange = e => {
    this.setState({
      choice: e.target.value
    });
  };
}

export default ConfirmationMethodPrompt;
