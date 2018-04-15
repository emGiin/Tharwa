import React, { Component } from 'react';
import { Provider } from 'react-redux';
import createStore from '../redux';

import { BrowserRouter as Router, Route } from "react-router-dom";


import Login from './Login';
import Admin from './Admin';
import './Styles/App.css';

export const store = createStore()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
        <Router>
            <div className="routChild">
                <div className="AppContent">
                      <Route path="/" exact component={Admin} />
                      <Route path="/login" exact   component={Login} />
                </div>
            </div>
        </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
