import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import AppContainer from "./components/AppContainer.js"

import api from "./assets/js/api.js"

class App extends Component {
  componentWillMount() {
    api.initSettings()
  }
  render() {
    return (
      <div className="App">
        <BrowserRouter basename={ process.env.PUBLIC_URL }>
          <AppContainer />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
