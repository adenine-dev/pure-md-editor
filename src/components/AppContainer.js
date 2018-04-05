import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { StyleSheet } from "aphrodite";
import cssGlobal from '../assets/js/css-global.js';

import ProjectList from "./ProjectList.js"
import Editor from "./Editor.js"
import Menu from "./Menu.js"
import Settings from "./Settings.js"

import { themes } from "../assets/js/theme.js"
import api from "../assets/js/api.js"

export default class AppContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      settings: {
        theme: api.getSetting("theme"),
      },
    }
    this.style = {
      ".CodeMirror, .markdown-renderer": {
        fontSize: api.getSetting("fontSize") + "px",
      },

    }
  }

  UNSAFE_componentWillMount() {
    document.body.style.backgroundColor = themes[this.state.settings.theme].bg
    document.body.classList.add(this.state.settings.theme)

  }

  render() {

    cssGlobal(this.style);


    return (
      <div className="app-container" className={ this.state.settings.theme }
           style={{ position: "relaitve" }}>
        <Menu theme={ this.state.settings.theme }/>
        <Switch>
          <Route exact path="/app/edit/:project/:editorType?/" component={ Editor } />
          <Route exact path="/app/projects/" component={ ProjectList } />
          <Route exact path="/app/settings/" component={ Settings } />
          <Redirect to="/app/projects/" />
        </Switch>
      </div>
    )
  }
}
