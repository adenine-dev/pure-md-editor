import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite/no-important';

import CodeMirrorEditor from "./CodeMirrorEditor.js"
import Toolbar from "./Toolbar.js"

import api from "../assets/js/api.js"
import { themes } from "../assets/js/theme.js"
import keymaps from "../assets/js/codemirror/keymap/keymap.js"



export default class DefaultEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      project: props.project,
      theme: api.getSetting("theme"),
      cm: null,
    }
    this.style = StyleSheet.create({
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
      }
    })
  }

  handleCmChange(cm) {
    let project = {...this.state.project};
    project.value = cm.getValue()
    this.setState({ project })
    if(this.props.onChange) {
      this.props.onChange(cm)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({project: nextProps.project})
  }

  getCMEditor(state, editor) {
    this.setState({ cm: editor })
  }

  render() {
    const actions = keymaps.map((action, i) => (
      <button key={ i }
              onClick={ (e) => {e.preventDefault(); action.action(this.state.cm, this.state, this, {}, {})} }
              className={ css(this.style.toobarButton) }>
        <i className={"material-icons " + css(this.style.toobarIcon)}>
          { action.icon }
        </i>
      </button>
    ))
    return (
      <div className="default-editor">
        <Toolbar>
          { actions }
        </Toolbar>
        <CodeMirrorEditor defaultValue={ this.state.project.value }
                          onChange={ this.handleCmChange.bind(this) }
                          onMount={ this.getCMEditor.bind(this) }/>
      </div>
    )
  }
}
