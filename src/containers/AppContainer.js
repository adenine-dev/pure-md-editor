import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { StyleSheet } from "aphrodite";
import cssGlobal from '../assets/js/css-global.js';

import ProjectList from "./ProjectList.js"
import Editor from "./Editor.js"
import Settings from "./Settings.js"

import Menu from "../components/Menu.js"

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
    const headerStyle = api.getSetting("EnlargeHeaders") ? {
      ".cm-header": {
        lineHeight: "1.1em",
      },
      ".cm-header-1": {
        fontSize: "2.4em",
        lineHeight: "1.6em",
      },
      ".cm-header-2": {
        fontSize: "2em",
        lineHeight: "1.4em",
      },
      ".cm-header-3": {
        fontSize: "1.8em",
        lineHeight: "1.2em",
      },
      ".cm-header-4": {
        fontSize: "1.4em",
      },
      ".cm-header-5": {
        fontSize: "1.2em",
      },
      ".cm-header-6": {
        fontSize: "1em",
      }
    } : {}
    this.style = {
      ".CodeMirror, .markdown-renderer": {
        fontSize: api.getSetting("fontSize") + "px",
        lineHeight: api.getSetting("lineHeight") + "em"
      },
      ...headerStyle
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
           style={{ position: "relative" }}>
        <Menu theme={ this.state.settings.theme }/>

        <Switch>
          <Route exact path="/app/edit/:project/:editorType?/" component={ Editor } />
          <Route exact path="/app/projects/" component={ ProjectList } />
          <Route exact path="/app/settings/" component={ Settings } />
          <Redirect to="/app/projects/" />
        </Switch>
        {/* TODO: make this not feel so wrong */}
        <Route pattern="/" render={() => {
          window.scrollTo(0, 0)
          return null
        }} />
      </div>
    )
  }
}
