import React, { Component } from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';

import DefaultEditor from "./DefaultEditor.js"
import SplitEditor from "./SplitEditor.js"
import Notification from "./Notification.js"

import themes from "../assets/js/theme.js"
import api from "../assets/js/api.js"


export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.getProject(props),
      editorType: props.match.params.editorType,
      notification: false,
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

  render() {
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
          <Route exact path="/app/edit/:project/default/" component={ DefaultEditor } />
          <Route exact path="/app/edit/:project/split/" component={ SplitEditor } />
          {/* <Route path="" component={  } /> */}
          <Redirect to={"/app/edit/" + this.state.project + "/default/"}/>
        </Switch>

      </div>
    )
  }
}
