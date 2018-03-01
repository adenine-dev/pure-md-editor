import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Editor from "./components/Editor.js"



class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/app/edit/" component={Editor}></Route>

            <Redirect to="/app/edit/"></Redirect>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
