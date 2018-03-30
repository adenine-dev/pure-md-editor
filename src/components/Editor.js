import React, { Component } from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import Mousetrap from "mousetrap"

import DefaultEditor from "./DefaultEditor.js"
import SplitEditor from "./SplitEditor.js"
import Notification from "./Notification.js"
import EmoteError from "./EmoteError.js"

import { themes } from "../assets/js/theme.js"
import api from "../assets/js/api.js"
import keymaps from "../assets/js/codemirror/keymap/keymap.js"


export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.getProject(props),
      editorType: props.match.params.editorType,
      notification: {
        value: "",
        show: false,
        name: "error",
      },
      theme: api.getSetting("theme"),

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
      placeholder: {
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        text: {
          textAlign: "center",
          opacity: "0.4",
          color: themes[this.state.theme].color,
          fontSize: "48px",
          fontWeight: "300",
        }
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
      const project = api.getProject(props.match.params.project)
      if(!project) {
        return { project: null }
      } else {
        return { project }
      }
    } else {
      return { project: api.getNewProject() }
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

  handleTitleChange(e) {
    if(this.state.project.name !== e.target.value) {
      if(api.renameProject(this.state.project.name, e.target.value)) {
        console.log(api.getProject(e.target.value));
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

  handleChange(cm) {
    let project = { ...this.state.project };
    project.value = cm.getValue()
    this.setState({ project })
  }

  componentWillMount() {
    keymaps.map((map) => {
      if(!map.cm) {
        Mousetrap.bindGlobal(map.name, (e, c) => map.action(e, c, this.state, this))
      }
    })
  }

  render() {
    if(!this.state.project) {
      return (
        <div style={ this.style.placeholder }>
          <EmoteError style={ this.style.placeholder.text }>
            <div style={ this.style.placeholder.text }>
              <p>A project with that name does not exist</p>
              <Link to={ "/app/edit/new/default/" }>Why not make a new one</Link>
            </div>
          </EmoteError>
        </div>
      )
    }
    if(this.props.match.params.project !== this.state.project.name) {
      return (
        <Redirect to={ "/app/edit/" + this.state.project.name + "/default/" }/>
      )
    }
    let notification
    if(this.state.notification) {
      notification = (
        <Notification style={ this.style[this.state.notification.name] }
                      onClose={ this.modalClose.bind(this) }
                      show={ this.state.notification.show }>
          { this.state.notification.value }
        </Notification>
      )
    }
    return (
      <div>
        { notification }
        <div>
          <input type="text"
                 defaultValue={ this.state.project.name }
                 style={ this.style.headerTitle }
                 onBlur={ this.handleTitleChange.bind(this) }/>
        </div>
        <Switch>
          <Route exact path="/app/edit/:project/default/" render={ (props) => (
            <DefaultEditor onChange={ this.handleChange.bind(this) }
                           project={ this.state.project } {...props}/>
          )} />
          <Route exact path="/app/edit/:project/split/" render={ (props) => (
            <SplitEditor onChange={ this.handleChange.bind(this) }
                           project={ this.state.project } {...props}/>
          )} />
          {/* <Route path="" component={  } /> */}
          <Redirect to={"/app/edit/" + this.state.project + "/default/"}/>
        </Switch>

      </div>
    )
  }
}
