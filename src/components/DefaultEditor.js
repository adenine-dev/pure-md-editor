import React, { Component } from 'react';
import Mousetrap from "mousetrap"

import CodeMirrorEditor from "./CodeMirrorEditor.js"

import keymaps from "../assets/js/codemirror/keymap/keymap.js"
import api from "../assets/js/api.js"
import theme from "../assets/js/theme.js"

const style = {
  headerTitle: {
    color: theme.themes[theme.getTheme()].color,
    textAlign: "center",
    padding: "4px",
    backgroundColor: theme.themes[theme.getTheme()].bg,
    margin: "0 auto",
    display: "block"
  }
}

export default class Editor extends Component {
  constructor(props) {
    super(props);
    if(props.match.params.project !== "new") {
      this.state = {
        project: api.getProject(props.match.params.project),
      }
    } else {
      this.state = {
        project: api.getNewProject()
      }
    }
  }
  componentWillMount() {
    keymaps.map((map) => {
      if(!map.cm) {
        Mousetrap.bind(map.name, (e, c) => map.action(e, c, this.state))
      }
    })
  }
  handleCmChange(cm) {
    this.state.project.value = cm.getValue()
  }
  handleTitleChange(e) {
    this.state.project.name = e.target.value
  }
  render() {
    return (
      <div className="default-editor">
        <div>
          <input type="text"
                 defaultValue={ this.state.project.name }
                 style={ style.headerTitle }
                 onBlur={ this.handleTitleChange.bind(this) }/>
        </div>
        <CodeMirrorEditor defaultValue={ this.state.project.value }
                          onChange={ this.handleCmChange.bind(this) }/>
      </div>
    )
  }
}
