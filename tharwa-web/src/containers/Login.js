import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Steps, Icon } from "antd";

import AuthActions from "../redux/AuthRedux";
import PinCodeActions from "../redux/PinCodeRedux";

import {
  Loading,
  PinForm,
  ConfirmationMethodPrompt,
  LoginForm
} from "../components/Login";
import "./Styles/Login.css";

const Step = Steps.Step;

class Login extends Component {
  static propTypes = {
    attemptLogin: PropTypes.func.isRequired,
    auth: PropTypes.shape({
      fetching: PropTypes.bool,
      success: PropTypes.bool,
      error: PropTypes.string
    }),
    pinCode: PropTypes.shape({
      fetching: PropTypes.bool,
      success: PropTypes.bool,
      error: PropTypes.string
    })
  };

  state = {
    current: 0,
    email: null,
    password: null,
    confirmationMethod: null,
    pin: null,
    error: null
  };

  componentWillReceiveProps(newProps) {
    const authError = newProps.auth.error;
    const pinError = newProps.pinCode.error;

    if (authError) {
      this.setState({ current: 0, error: authError });
    } else if (pinError) {
      this.setState({ error: pinError })
    } else this.setState({ error: null }) ;


    if (newProps.auth.success && this.state.current === 1) {
      this.setState({ current: this.state.current + 1 });
    }
  }

  render() {
    const steps = [
      {
        title: "Login",
        content: <LoginForm onNext={this.handleLoginForm.bind(this)} />,
        icon: <Icon type="user" />
      },
      {
        title: "Code Pin",
        content: (
          <ConfirmationMethodPrompt
            onNext={this.submitCredentials.bind(this)}
          />
        ),
        icon: <Icon type="inbox" />
      },
      {
        title: "Vérification",
        content: <PinForm onNext={this.submitPin.bind(this)} />,
        icon: <Icon type="qrcode" />
      }
    ];

    const current = this.state.current;

    return (
      <div className="loginForms">
        {this.state.error && this.state.current===0 && alert(this.state.error)}
        <Steps current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} icon={item.icon} />
          ))}
        </Steps>

        <div className="stepContent">
          {this.props.auth.fetching || this.props.pinCode.fetching ? (
            <Loading />
          ) : (
            steps[current].content
          )}
        </div>
      </div>
    );
  }

  handleLoginForm(email, password) {
    this.setState({
      email,
      password,
      current: this.state.current + 1
    });
  }

  submitCredentials(confirmationMethod) {
    this.setState({ confirmationMethod }, this.sendCredentials);
  }
  sendCredentials() {
    this.props.attemptLogin(
      this.state.email,
      this.state.password,
      this.state.confirmationMethod
    );
  }

  submitPin(pin) {
    this.setState({ pin }, this.sendPin);
  }
  sendPin() {
    this.props.confirmPinCode(this.state.pin);
  }
}

const mapStateToProps = state => {
  // extracting only some properties of state.auth
  const auth = (({ fetching, error, success }) => ({
    fetching,
    error,
    success
  }))(state.auth);
  
  const pinCode = (({ fetching, error, success }) => ({
    fetching,
    error,
    success
  }))(state.pinCode);

  return { auth, pinCode };
};

const mapDispatchToProps = dispatch => {
  return {
    attemptLogin: (email, password, confirmationMethod) =>
      dispatch(AuthActions.authRequest(email, password, confirmationMethod)),
    confirmPinCode: pinCode => dispatch(PinCodeActions.pinCodeRequest(pinCode))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
