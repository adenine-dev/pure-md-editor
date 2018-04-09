import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite/no-important';

import CodeMirrorEditor from "./CodeMirrorEditor.js"

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
  }

  handleCmChange(cm) {
    let project = {...this.state.project};
    project.value = cm.getValue()
    this.setState({ project })
    if(this.props.onChange) {
      this.props.onChange(cm)
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({project: nextProps.project})
  }

  getCMEditor(state, editor) {
    this.setState({ cm: editor })
    if(this.props.onMount) {
      this.props.onMount(editor)
    }
  }

  render() {


    return (
      <div className="default-editor">
        <CodeMirrorEditor defaultValue={ this.state.project.value }
                          onChange={ this.handleCmChange.bind(this) }
                          onMount={ this.getCMEditor.bind(this) }/>
      </div>
    )
  }
}
