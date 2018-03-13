import React, { Component } from 'react';

import CodeMirrorEditor from "./CodeMirrorEditor.js"

import api from "../assets/js/api.js"


export default class Editor extends Component {
  constructor(props) {
    super(props);
    if(props.match.params.project !== "new") {
      this.state = {
        project: api.getProject(props.match.params.project),
      }
    }
    this.state = {
      project: api.getNewProject()
    }
  }

  render() {
    console.log("hi");
    return (
      <div className="default-editor">
        <CodeMirrorEditor defaultValue={ this.state.project.value }/>
      </div>
    )
  }
}
