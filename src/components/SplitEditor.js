import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Mousetrap from "mousetrap"

import CodeMirrorEditor from "./CodeMirrorEditor.js"

import api from "../assets/js/api.js"
import themes from "../assets/js/theme.js"
import "../assets/js/globalbind.js"
import Notification from "./Notification.js"
import MarkdownRenderer from "./MarkdownRenderer.js"



export default class SplitEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.getProject(props),
      theme: api.getSetting("theme"),
    }
    this.style = {
      splitter: {
        display: "flex",
        justifyContent: "space-around",
        overflow: "hidden",
        position: "relative"
      },
      splitItem: {
        width: "50%",
      },
      divBar: {
        width: "1px",
        height: "80%",
        backgroundColor: themes[this.state.theme].accent,
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

  handleCmChange(cm) {
    let project = {...this.state.project};
    project.value = cm.getValue()
    this.setState({ project })
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.getProject(nextProps))
  }

  render() {
    return (
      <div className="split-editor">
        <div className="spit-view" style={ this.style.splitter }>
          <CodeMirrorEditor defaultValue={ this.state.project.value }
                            onChange={ this.handleCmChange.bind(this) }
                            style={ this.style.splitItem }/>
          <div style={ this.style.divBar }></div>
          <MarkdownRenderer markdown={ this.state.project.value }
                            style={ this.style.splitItem }/>
        </div>
      </div>
    )
  }
}
