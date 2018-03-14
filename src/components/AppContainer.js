import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import ProjectList from "./ProjectList.js"
import Editor from "./Editor.js"
import Menu from "./Menu.js"

export default class AppContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      settings: {
        theme: "light",
      },
    }
  }


  render() {
    return (
      <div className="app-container" className={ this.state.settings.theme }
           style={{ position: "relaitve" }}>
        <Menu theme={ this.state.settings.theme }/>
        <Switch>
          <Route exact path="/app/edit/:project/:editorType?/" render={() => (
            <Editor theme={ this.state.settings.theme }/>
          )}></Route>
          <Route exact path="/app/projects/" render={() => (
            <ProjectList theme={ this.state.settings.theme }/>
          )}></Route>

          <Redirect to="/app/projects/" />
        </Switch>
      </div>
    )
  }
}
