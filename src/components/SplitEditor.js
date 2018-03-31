import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Mousetrap from "mousetrap"
import { StyleSheet, css } from 'aphrodite/no-important';

import CodeMirrorEditor from "./CodeMirrorEditor.js"
import MarkdownRenderer from "./MarkdownRenderer.js"

import api from "../assets/js/api.js"
import { themes } from "../assets/js/theme.js"
import "../assets/js/globalbind.js"



export default class SplitEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      project: props.project,
      theme: api.getSetting("theme"),
    }
    this.style = StyleSheet.create({
      splitter: {
        display: "flex",
        justifyContent: "space-around",
        overflow: "hidden",
        position: "relative",
        width: "90%",
        margin: "0 auto",
        flex: "1",
        height: "calc(100vh - 24px)"
      },
      splitItem: {
        width: "50%",
        margin: "40px 0",
        overflow: "scroll",
        height: "100%",

      },
      divBar: {
        width: "1px",
        height: "80%",
        backgroundColor: themes[this.state.theme].accent,
        position: "absolute",
        opacity: "0.2",
        top: "64px",
      }
    })
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
        <div className={"spit-view " + css(this.style.splitter) }>
          <div className={ css(this.style.splitItem) }>
            <CodeMirrorEditor defaultValue={ this.state.project.value }
                              onChange={ this.handleCmChange.bind(this) } />
          </div>
          <div className={ css(this.style.divBar) }></div>
          <div className={ css(this.style.splitItem) }>
            <MarkdownRenderer markdown={ this.state.project.value } />
          </div>
        </div>
      </div>
    )
  }
}
