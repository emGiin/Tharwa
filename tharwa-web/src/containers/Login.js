import React, { Component } from "react";
import { Steps, message, Icon } from "antd";

import {
  Loading,
  PinForm,
  ConfirmationMethodPrompt,
  LoginForm
} from "../components/Login";
import "./Styles/Login.css";

const Step = Steps.Step;

class Login extends Component {
  state = {
    current: 0,
    isLoading: false,
    email: null,
    password: null,
    authCode: null,
    confirmationMethod: null,
    pin: null
  };

  render() {
    const steps = [
      {
        title: "Login",
        content: <LoginForm onNext={this.next.bind(this)} />,
        icon: <Icon type="user" />
      },
      {
        title: "Code Pin",
        content: <ConfirmationMethodPrompt onNext={this.next.bind(this)} />,
        icon: <Icon type="inbox" />
      },
      {
        title: "Vérification",
        content: <PinForm onNext={this.done.bind(this)} />,
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

        <div className="stepContent">
          {this.state.isLoading ? <Loading /> : steps[current].content}
        </div>
      </div>
    );
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ ...this.state, current });
  }

  done() {
    message.success("Processing complete!");
  }
}

export default Login;
