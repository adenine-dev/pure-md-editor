import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Mousetrap from "mousetrap"

import CodeMirrorEditor from "./CodeMirrorEditor.js"

import keymaps from "../assets/js/codemirror/keymap/keymap.js"
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
      notification: false
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
      },
      error: {
        backgroundColor: themes[this.state.theme].error,
        color: themes[this.state.theme].color,
      },
      success: {
        backgroundColor: themes[this.state.theme].success,
        color: themes[this.state.theme].color,
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
        Mousetrap.bindGlobal(map.name, (e, c) => map.action(e, c, this.state, this))
      }
    })
  }
  handleCmChange(cm) {
    let project = {...this.state.project};
    project.value = cm.getValue()
    this.setState({ project })
  }
  handleTitleChange(e) {
    if(this.state.project.name !== e.target.value) {
      if(api.renameProject(this.state.project.name, e.target.value)) {
        this.setState({ project: api.getProject(e.target.value) })
      } else {
        this.setState({notification: {
          value: "the project failed to be renamed",
          show: true,
          name: "error"
        }})
        e.target.value = this.state.project.name
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState(this.getProject(nextProps))
  }
  modalClose(e) {
    let notification = {...this.state.notification};
    notification.show = false
    this.setState({ notification })
  }
  render() {
    if(this.props.match.params.project !== this.state.project.name) {
      return (
        <Redirect to={ "/app/edit/" + this.state.project.name + "/default/" }/>
      )
    }
    let notification
    if(this.state.notification){
      notification = (
        <Notification style={ this.style[this.state.notification.name] }
                      onClose={ this.modalClose.bind(this) }
                      show={ this.state.notification.show }>
          { this.state.notification.value }
        </Notification>
      )
    }
    return (
      <div className="default-editor">
        { notification }
        <div>
          <input type="text"
                 defaultValue={ this.state.project.name }
                 style={ this.style.headerTitle }
                 onBlur={ this.handleTitleChange.bind(this) }/>
        </div>
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
