import React from 'react';
import ReactDOM from 'react-dom';
import './reset.less';
import './rem/rem';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
