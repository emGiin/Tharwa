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
export const store = createStore();
ReactDOM.render(
  <Provider store={store}>
  <div className="App">
    <ConfirmInscription />
  </div>
</Provider>, document.getElementById('root'));
registerServiceWorker();