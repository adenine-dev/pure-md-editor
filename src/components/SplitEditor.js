import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Mousetrap from "mousetrap"

import CodeMirrorEditor from "./CodeMirrorEditor.js"
import MarkdownRenderer from "./MarkdownRenderer.js"

import api from "../assets/js/api.js"
import themes from "../assets/js/theme.js"
import "../assets/js/globalbind.js"



export default class SplitEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      project: props.project,
      theme: api.getSetting("theme"),
    }
    this.style = {
      splitter: {
        display: "flex",
        justifyContent: "space-around",
        overflow: "hidden",
        position: "relative",
        width: "90%",
        margin: "0 auto",

      },
      splitItem: {
        width: "50%",
        padding: "8px"
      },
      divBar: {
        width: "1px",
        height: "80%",
        backgroundColor: themes[this.state.theme].accent,
        position: "absolute",
        opacity: "0.2",
        top: "64px",
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

  componentWillReceiveProps(nextProps) {
    this.setState({project: nextProps.project})
  }

  handleCmChange(cm) {
    let project = {...this.state.project};
    project.value = cm.getValue()
    this.setState({ project })
    if(this.props.onChange) {
      this.props.onChange(cm)
    }
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
