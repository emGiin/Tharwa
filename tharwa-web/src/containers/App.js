import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import { connect } from "react-redux";

import ConfirmInscription from "./ConfirmInscription";


class App extends Component {
  render() {
    const isLoggedIn = (({ authToken, pinCode }) => authToken && pinCode)(
      this.props.auth
    );
    if (!isLoggedIn) return <Redirect to="/login" push />;
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" component={ConfirmInscription} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  const auth = (({ authToken, pinCode }) => ({
    authToken,
    pinCode
  }))(state.auth);
  return { auth };
};

export default connect(mapStateToProps)(App);
