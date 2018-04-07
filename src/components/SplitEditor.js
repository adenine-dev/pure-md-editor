import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Mousetrap from "mousetrap"
import { StyleSheet, css } from 'aphrodite/no-important';
import { ScrollSync, ScrollSyncPane } from "react-scroll-sync"

import CodeMirrorEditor from "./CodeMirrorEditor.js"
import MarkdownRenderer from "./MarkdownRenderer.js"
import Toolbar from "./Toolbar.js"

import api from "../assets/js/api.js"
import keymaps from "../assets/js/codemirror/keymap/keymap.js"

import { themes, breakpoints } from "../assets/js/theme.js"
import "../assets/js/globalbind.js"

const PANES = {
  EDITOR:  "EDITOR",
  PREVIEW: "PREVIEW",
}


export default class SplitEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      project: props.project,
      theme: api.getSetting("theme"),
      activePane: PANES.EDITOR
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
        height: "calc(100vh - 24px)",
      },
      splitItem: {
        width: "50%",
        margin: "40px 0",
        overflowY: "scroll",
        height: "100%",
        [breakpoints.tablet]: {
          width: "100%",
          transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
          flex: 0,
          overflow: "hidden"
        }
      },
      splitItemActive: {
        [breakpoints.tablet]: {
          flex: 1,
          overflow: "auto"
        }
      },
      divBar: {
        width: "1px",
        height: "80%",
        backgroundColor: themes[this.state.theme].accent,
        position: "absolute",
        opacity: "0.2",
        bottom: "64px",
        [breakpoints.tablet]: {
          display: "none"
        }
      },
      toobarButton: {
        color: themes[this.state.theme].color,
        width: "56px",
        backgroundColor: "transparent",
        verticalAlign: "middle",
        height: "100%",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      },
      toobarIcon: {
        verticalAlign: "middle",
        height: "100%"
      },
      paneSwapButton: {
        display: "none",
        transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
        [breakpoints.tablet]: {
          display: "block",
          backgroundColor: themes[this.state.theme].accent,
          position: "fixed",
          top: "calc(50% - 58px)",
          width: "24px",
          height: "116px",
          cursor: "pointer",
          color: themes[this.state.theme].color,
        }
      }
    })
  }

  getCMEditor(state, editor) {
    this.setState({ cm: editor })
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
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

  togglePane(e) {
    this.setState({ activePane: this.state.activePane === PANES.EDITOR ? PANES.PREVIEW : PANES.EDITOR })
  }

  render() {
    const actions = keymaps.map((action, i) => (
      <button key={ i }
              onClick={ (e) => {
                this.state.cm.focus();
                action.action(this.state.cm, this.state, this, {}, {})
              } }
              className={ css(this.style.toobarButton) }>
        <i className={"material-icons " + css(this.style.toobarIcon)}>
          { action.icon }
        </i>
      </button>
    ))
    return (
      <div className="split-editor">
        <Toolbar>
          { actions }
        </Toolbar>
        <button className={ css(this.style.paneSwapButton) }
                style={{ left: (this.state.activePane !== PANES.EDITOR ? "0" : "calc(100% - 24px)") }}
                onClick={ this.togglePane.bind(this) }>
          <i className="material-icons">{ this.state.activePane === PANES.EDITOR ? "keyboard_arrow_right" : "keyboard_arrow_left" }</i>
        </button>
        <ScrollSync>
          <div className={"spit-view " + css(this.style.splitter) }>
            <ScrollSyncPane>
              <div className={ "syncscroll " + css([this.style.splitItem, ((this.state.activePane === PANES.EDITOR) ? this.style.splitItemActive : undefined)]) } >
                <CodeMirrorEditor defaultValue={ this.state.project.value }
                                  onChange={ this.handleCmChange.bind(this) }
                                  onMount={ this.getCMEditor.bind(this) } />
              </div>
            </ScrollSyncPane>
            <div className={ css(this.style.divBar) } ></div>
            <ScrollSyncPane>
              <div className={ "syncscroll " + css([this.style.splitItem, ((this.state.activePane === PANES.PREVIEW) ? this.style.splitItemActive : undefined)]) } >
                <MarkdownRenderer markdown={ this.state.project.value } />
              </div>
            </ScrollSyncPane>
          </div>
        </ScrollSync>
      </div>
    )
  }
}
