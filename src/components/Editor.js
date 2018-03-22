import React, { Component } from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';

import DefaultEditor from "./DefaultEditor.js"
import SplitEditor from "./SplitEditor.js"


export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorType: props.match.params.editorType,
      project: props.match.params.project,
    }
  }

  render() {
    return (
      <Switch>
        <Route exact path="/app/edit/:project/default/" component={ DefaultEditor } />
        <Route path="/app/edit/:project/split/" component={ SplitEditor } />
        {/* <Route path="" component={  } /> */}
        <Redirect to={"/app/edit/" + this.state.project + "/default/"}/>
      </Switch>
    )
  }
}
