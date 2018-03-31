import React, { Component } from 'react';
import CodeMirror from 'codemirror';
import keymaps from "../assets/js/codemirror/keymap/keymap.js"
import { StyleSheet, css } from 'aphrodite/no-important';

import '../assets/js/codemirror/mode/gfm.js';

import '../assets/js/codemirror/addon/continuelist.js';
import '../assets/js/codemirror/addon/overlay.js';
import '../assets/js/codemirror/addon/closebrackets.js';
import '../assets/js/codemirror/addon/placeholder.js';

import 'codemirror/mode/javascript/javascript.js';
// import 'codemirror/mode/clike/clike.js';
// import 'codemirror/mode/css/css.js';





export default class CodeMirrorEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editor: null,
      value: props.defaultValue,
      theme: props.theme
    }
    this.style = StyleSheet.create({
      editorWrapperStyle: {
        width: "90%",
        margin: "32px auto",
        maxWidth: "960px",
      }
    })
  }
  componentDidMount() {
    let editor = CodeMirror(this.cm, {
      mode: {
        name: "gfm",
        highlightFormatting: true,
        ignoreUnderscore: true,
        taskLists: true,
        fencedCodeBlocks: true,
        underline: true,

      },
      value: this.state.value,
      placeholder: "write something",
      autofocus: true,
      addModeClass: true,
      indentUnit: 2,
      tabSize: 2,
      autoCloseBrackets: true,
      extraKeys: {
        "Enter": "newlineAndIndentContinueMarkdownList",
      },
    })
    let keymap = {};
    for(let i = 0; i < keymaps.length; i++) {
      if(keymaps[i].cm) {
        keymap[keymaps[i].name] = keymaps[i].action
      }
    }
    if(this.props.onChange) {
      editor.on("change", (cm) => {
        this.props.onChange(cm)
      })
    }

    editor.addKeyMap( keymap );
    this.setState({ editor })

  }
  render() {
    return (
      <div className={ css([this.style.editorWrapperStyle, this.props.style]) + " editor"} >
        <div id="main-editor"
             className={ this.state.theme }
             ref={(cm) => { this.cm = cm }}></div>
      </div>
    );
  }
}
