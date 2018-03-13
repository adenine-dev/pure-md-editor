import React, { Component } from 'react';
import CodeMirror from 'codemirror';
import keymaps from "../assets/js/codemirror/keymap/keymap.js"

import '../assets/js/codemirror/mode/gfm.js';

import '../assets/js/codemirror/addon/continuelist.js';
import '../assets/js/codemirror/addon/overlay.js';
import '../assets/js/codemirror/addon/closebrackets.js';
import '../assets/js/codemirror/addon/placeholder.js';

import 'codemirror/mode/javascript/javascript.js';
// import 'codemirror/mode/clike/clike.js';


const editorWrapperStyle = {
  width: "90%",
  margin: "32px auto",
  maxWidth: "960px",
}

export default class CodeMirrorEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editor: null,
      value: props.defaultValue
    }
  }
  componentDidMount() {
    let editor = CodeMirror(this.cm, {
      mode: {
        name: "gfm",
        highlightFormatting: true,
        ignoreUnderscore: true,
        taskLists: true,
        fencedCodeBlocks: true,
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
    keymaps.map((map) => {
      if(map.cm) {
        keymap[map.name] = map.action
      }
    })
    if(this.props.onChange) {
      editor.on("change", (cm) => {
        console.log(cm)
        this.props.onChange(cm)
      })
    }

    editor.addKeyMap( keymap );
    this.setState({ editor })

  }
  render() {
    return (
      <div className={"editor" + this.props.className}
           style={{...editorWrapperStyle, ...this.props.style}}>

        <div id="main-editor" ref={(cm) => { this.cm = cm }}></div>
      </div>
    );
  }
}
