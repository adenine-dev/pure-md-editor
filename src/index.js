import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import "./assets/style/style.css"
import "codemirror/lib/codemirror.css"
// import "codemirror/mode/markdown.js"

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
