import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './assets/js/markdown.js';

import "./assets/style/style.css"
// import 'codemirror/mode/markdown/markdown.js';
// import 'codemirror/mode/gfm/gfm.js';
// import 'codemirror/addon/display/placeholder.js';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
