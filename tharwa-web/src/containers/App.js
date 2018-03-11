import React, { Component } from 'react';
import { Provider } from 'react-redux'
import createStore from '../redux'

import Login from './Login';
import './Styles/App.css';

const store = createStore()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
            <Login />
        </div>
      </Provider>
    );
  }
}

export default App;
