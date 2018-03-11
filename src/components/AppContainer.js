import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import Editor from "./Editor.js"
import NoteList from "./NoteList.js"


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
          <Route path="/app/edit/" component={ Editor }></Route>
          <Route path="/app/projects/" component={ NoteList }></Route>

          <Redirect to="/app/edit/"></Redirect>
        </Switch>
      </div>
    )
  }
}
