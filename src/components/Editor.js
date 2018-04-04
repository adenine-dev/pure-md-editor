import React, { Component } from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import Mousetrap from "mousetrap"
import { StyleSheet, css } from 'aphrodite/no-important';

import DefaultEditor from "./DefaultEditor.js"
import SplitEditor from "./SplitEditor.js"
import DistractionEditor from "./DistractionEditor.js"

import Notification from "./Notification.js"
import EmoteError from "./EmoteError.js"

import { themes, breakpoints } from "../assets/js/theme.js"
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
    this.style = StyleSheet.create({
      headerTitle: {
        color: themes[this.state.theme].color,
        textAlign: "center",
        padding: "4px",
        backgroundColor: themes[this.state.theme].bg,
        margin: "0 auto",
        display: "block",
        width: "100%",
        height: "24px"
      },
      placeholder: {
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      },
      placeholderText: {
        textAlign: "center",
        opacity: "0.4",
        color: themes[this.state.theme].color,
        fontSize: "48px",
        padding: "0 16px",
        fontWeight: "300",
        [breakpoints.phone]: {
          fontSize: "32px"
        },
        [breakpoints.small]: {
          fontSize: "24px"
        }
      },
      placeholderLink: {
        transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
        border: "3px solid " + themes[this.state.theme].color,
        padding: "8px 16px",
        display: "table",
        margin: "0 auto",
        ":hover": {
          opacity: "1",
        }
      },
      error: {
        backgroundColor: themes[this.state.theme].error,
        color: themes[this.state.theme].color,
      },
      success: {
        backgroundColor: themes[this.state.theme].success,
        color: themes[this.state.theme].color,
      },
    })
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

  UNSAFE_componentWillReceiveProps(nextProps) {
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

  UNSAFE_componentWillMount() {
    for(let i = 0; i < keymaps.length; i++) {
      if(!keymaps[i].cm) {
        Mousetrap.bindGlobal(keymaps[i].name, (e, c) => keymaps[i].action(null, this.state, this, e, c))
      }
    }
  }

  render() {
    if(!this.state.project) {
      return (
        <div className={ css(this.style.placeholder) }>
          <EmoteError style={ this.style.placeholderText }>
            <div>
              <p className={ css(this.style.placeholderText) }>A project with that name does not exist</p>
              <br />
              <Link to="/app/edit/new/default">
                <p className={ css(this.style.placeholderText, this.style.placeholderLink) }>
                  create one?
                </p>
              </Link>
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
                 className={ css(this.style.headerTitle) }
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
          <Route exact path="/app/edit/:project/distraction/" render={ (props) => (
            <DistractionEditor onChange={ this.handleChange.bind(this) }
                               project={ this.state.project } {...props}/>
          )} />

          {/* <Redirect to={"/app/edit/" + this.state.project + "/default/"}/> */}
        </Switch>

      </div>
    )
  }
}
