import React, { Component } from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import createStore from "./redux";

import { Login, App } from "./containers";
import "./containers/Styles/App.css";

export const store = createStore();

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="*" component={App} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default Root;
