import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import App from './containers/App';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();


// todo redux version
/*
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';

import { composeWithDevTools } from 'redux-devtools-extension';

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import webApp from './redux/reducers'


import registerServiceWorker from './registerServiceWorker';

const initialState = {
    login : {
        tabLogin : 'nopin'
    }
};

let store = createStore(webApp , initialState, composeWithDevTools());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));

registerServiceWorker();
*/


//todo for testin componenets 
// import './App.css';

/*//////////////////
    testing component
/*/////////////////

// ReactDOM.render(<App />, document.getElementById('root'));
