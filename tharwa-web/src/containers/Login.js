import React, { Component } from "react";
import { Steps, message, Icon } from "antd";

import LoginForm from "../components/Login/LoginForm";
import PinChoiceForm from "../components/Login/PinChoiceForm";
import PinFrom from "../components/Login/PinFrom";
import "./Styles/Login.css";

const Step = Steps.Step;


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };
  }

  render() {

    const steps = [
      {
        title: "Login",
        content: <LoginForm onNext={this.next.bind(this)} />,
        icon: <Icon type="user" />
      },
      {
        title: "Code Pin",
        content: <PinChoiceForm onNext={this.next.bind(this)}/>,
        icon: <Icon type="inbox" />
      },
      {
        title: "Vérification",
        content: <PinFrom onNext={this.done.bind(this)}/>,
        icon: <Icon type="qrcode" />
      }
    ];

    const current = this.state.current;

    return (
      <div className="loginForms">
        <Steps current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} icon={item.icon} />
          ))}
        </Steps>

        <div className="stepContent">{steps[current].content}</div>

        <div className="stepActions">
          {/* {current > 0 && (
            <Button onClick={this.prev.bind(this)}>
              Previous
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button type="primary" 
              className="primaryAction"
              onClick={this.next.bind(this)}
            >
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              className="primaryAction"     
              onClick={this.done.bind(this)}         
            >
              Done
            </Button>
          )} */}
        </div>
      </div>
    );
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  done() {
    message.success("Processing complete!");  
  }

}

export default Login;
