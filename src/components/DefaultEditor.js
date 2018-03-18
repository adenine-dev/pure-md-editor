import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Mousetrap from "mousetrap"

import CodeMirrorEditor from "./CodeMirrorEditor.js"

import keymaps from "../assets/js/codemirror/keymap/keymap.js"
import api from "../assets/js/api.js"
import themes from "../assets/js/theme.js"
import "../assets/js/globalbind.js"
import Notification from "./Notification.js"



export default class Editor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.getProject(props),
      theme: api.getSetting("theme")
    }
    this.style = {
      headerTitle: {
        color: themes[this.state.theme].color,
        textAlign: "center",
        padding: "4px",
        backgroundColor: themes[this.state.theme].bg,
        margin: "0 auto",
        display: "block",
        width: "100%",
      },
      error: {
        // backgroundColor: themes[this.state.theme].error
      }
    }
  }
  getProject(props) {
    if(props.match.params.project !== "new") {
      return {
        project: api.getProject(props.match.params.project),
      }
    } else {
      return {
        project: api.getNewProject()
      }
    }
  }
  componentWillMount() {
    keymaps.map((map) => {
      if(!map.cm) {
        Mousetrap.bindGlobal(map.name, (e, c) => map.action(e, c, this.state))
      }
    })
  }
  handleCmChange(cm) {
    let project = {...this.state.project};
    project.value = cm.getValue()
    this.setState({ project })
  }
  handleTitleChange(e) {
    if(api.renameProject(this.state.project.name, e.target.value)) {
      this.setState({ project: api.getProject(e.target.value) })
    } else {
      this.setState({ errorText: "the project failed to be renamed" })
      e.target.value = this.state.project.name
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log(api.getProjects())
    console.log(nextProps);
    console.log(this.getProject(nextProps));
    this.setState(this.getProject(nextProps))
  }
  modalClose(e) {
    this.setState({ errorText: "" })
  }
  render() {
    if(this.props.match.params.project !== this.state.project.name) {
      return (
        <Redirect to={ "/app/edit/" + this.state.project.name + "/default/" }/>
      )
    }
    return (
      <div className="default-editor">
        <Notification style={ this.style.error }
                      onClose={ this.modalClose.bind(this) }
                      show={ this.state.errorText }>
          { this.state.errorText }
        </Notification>
        <div>
          <input type="text"
                 defaultValue={ this.state.project.name }
                 style={ this.style.headerTitle }
                 onBlur={ this.handleTitleChange.bind(this) }/>
        </div>
        <CodeMirrorEditor defaultValue={ this.state.project.value }
                          onChange={ this.handleCmChange.bind(this) }/>
      </div>
    )
  }
}
