import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const title = "CMS";

ReactDOM.render(<App title={title} />, document.getElementById('root'));
registerServiceWorker();
