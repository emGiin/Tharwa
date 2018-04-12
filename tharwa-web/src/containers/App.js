import React, { Component } from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import createStore from "../redux";

import Login from "./Login";
import ConfirmInscription from "./ConfirmInscription";
import "./Styles/App.css";

export const store = createStore();

class App extends Component {
  render() {
    const isLoggedIn = (({ authToken, pinCode }) => authToken && pinCode)(
      store.getState().auth
    );

    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Switch>
              <Route path="/login" exact component={Login} />
              {(isLoggedIn)? <Redirect to="/login" />: 
              <div className="protectedRoutes">
                <Route path="/Inscription" exact component={ConfirmInscription} />
                <Route path="/" exact component={ConfirmInscription} />
              </div>}
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
