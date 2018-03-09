import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import AppContainer from "./components/AppContainer.js"



class App extends Component {
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
