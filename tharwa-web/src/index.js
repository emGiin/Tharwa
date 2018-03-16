import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import App from './containers/App';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();


/*
import RequestsTable from './components/Banker/RequestsTable'

ReactDOM.render(<RequestsTable />, document.getElementById('root'));
registerServiceWorker();*/