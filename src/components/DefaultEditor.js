import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import CodeMirrorEditor from "./CodeMirrorEditor.js"

import api from "../assets/js/api.js"
import { themes } from "../assets/js/theme.js"
import "../assets/js/globalbind.js"



export default class DefaultEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      project: props.project,
      theme: api.getSetting("theme"),
    }
    this.style = {
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

  render() {
    return (
      <div className="default-editor">
        <CodeMirrorEditor defaultValue={ this.state.project.value }
                          onChange={ this.handleCmChange.bind(this) }/>
      </div>
    )
  }
}
