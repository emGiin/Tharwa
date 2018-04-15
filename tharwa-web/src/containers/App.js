import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import { connect, Provider } from "react-redux";
import createStore from '../redux'

import ConfirmInscription from "./ConfirmInscription";

export const store = createStore()
class App extends Component {
  render() {
    const isLoggedIn = (({ authToken, pinCode }) => authToken && pinCode)(
      this.props.auth
    );
    if (!isLoggedIn) return <Redirect to="/login" push />;
    return (
      <Router>
        <Provider store={store}>
        <div className="App">
          <Switch>
            <Route path="/" component={ConfirmInscription} />
          </Switch>
        </div>
        </Provider>
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
