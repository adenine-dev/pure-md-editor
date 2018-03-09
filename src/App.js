import React, { Component } from 'react';
import { HashRouter, Switch, Route, Redirect} from 'react-router-dom';
import AppContainer from "./components/AppContainer.js"



class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
          <AppContainer />
        </HashRouter>
      </div>
    );
  }
}

export default App;
