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
        content: <LoginForm onNext={this.handleLoginForm.bind(this)} />,
        icon: <Icon type="user" />
      },
      {
        title: "Code Pin",
        content: <ConfirmationMethodPrompt onNext={this.submitCredentials.bind(this)} />,
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

  handleLoginForm(email, password) {
    this.setState({
      ...this.state,
      email,
      password,
      current: this.state.current + 1
    });
  }

  submitCredentials(confirmationMethod) {
    this.setState(
      {
        ...this.state,
        confirmationMethod
      },
      this.sendCredentials
    );
  }

  sendCredentials() {
    APIMOCK.post("server", {
      email: this.state.email,
      password: this.state.password,
      confirmationMethod: this.state.confirmationMethod
    }).then(response => {
      console.log(`authorisation code received`, response);
      this.setState({
        ...this.state,
        authCode: response,
        isLoading: false,
        current: this.state.current + 1
      });
    });
    this.setState({
      ...this.state,
      isLoading: true
    });
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ ...this.state, current });
  }

  done() {
    message.success("Processing complete!");
  }
}

const APIMOCK = {
  post: (url, data) => {
    console.log(`sending in data to ${url} :  `, data);
    return new Promise((resolve, reject) => {
      setTimeout(function() {
        resolve("a321bab132c21e12a");
      }, 1000);
    });
  }
};

export default Login;
