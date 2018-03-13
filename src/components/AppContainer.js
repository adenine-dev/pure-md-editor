import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import ProjectList from "./ProjectList.js"
import Editor from "./Editor.js"

export default class AppContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      settings: {
        theme: "dark",
      },
    }
  }


  render() {
    return (
      <div className="app-container" className={ this.state.settings.theme }>
        <Switch>
          <Route exact path="/app/edit/:project/:editorType?/" component={ Editor }></Route>
          <Route exact path="/app/projects/" component={ ProjectList }></Route>

          {/* <Redirect to="/app/projects/"></Redirect> */}
        </Switch>
      </div>
    )
  }
}
