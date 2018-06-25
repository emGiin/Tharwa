import React, { Component } from "react";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import AppLayout from "./AppLayout";

class App extends Component {
  render() {
    // const isLoggedIn = (({ authToken, pinCode }) => authToken && pinCode)(
    //   this.props.auth
    // );
    const isLoggedIn = true;
    if (!isLoggedIn) return <Redirect to="/login" push />;
    return (
      <Router>
        <div className="App">
          <AppLayout clientType={this.props.auth.clientType}/>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  const auth = (({ authToken, pinCode, clientType }) => ({
    authToken,
    pinCode,
    clientType
  }))(state.auth);
  return { auth };
};

export default connect(mapStateToProps)(App);
