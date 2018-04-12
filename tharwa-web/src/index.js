import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import App from './containers/App';


/*
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();*/

import { Provider } from 'react-redux';
import createStore from './redux'
import ConfirmInscription from './containers/ConfirmInscription'
import ValidateTransfer from './containers/ValidateTransfer'
export const store = createStore();
ReactDOM.render(
  <Provider store={store}>
  <div className="App">
    <ValidateTransfer />
  </div>
</Provider>, document.getElementById('root'));
registerServiceWorker();