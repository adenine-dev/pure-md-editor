import React, { Component } from 'react';
import CodeMirror from 'codemirror';
import keymaps from "../assets/js/codemirror/keymap/keymap.js"

import '../assets/js/codemirror/mode/markdown.js';

import '../assets/js/codemirror/addon/continuelist.js';
import '../assets/js/codemirror/addon/fold.js';


const editorWrapperStyle = {
  width: "90%",
  margin: "32px auto",
  maxWidth: "960px",
  fontFamily: "'Roboto', sans-serif",
}

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editor: null
    }
  }
  componentDidMount() {
    let editor = CodeMirror(document.getElementById("main-editor"), {
      mode: {
        name: "markdown",
        highlightFormatting: true
      },
      autofocus: true,
      highlightFormatting: true,
      extraKeys: {
        "Enter": "newlineAndIndentContinueMarkdownList",
        "Ctrl-Q": "fold"
      }
    })
    let keymap = {};
    keymaps.map((map) => {
      keymap[map.name] = map.action
    })
    editor.addKeyMap( keymap );
    this.setState({ editor })

  }
  render() {
    return (
      <div className="editor"
           style={{...editorWrapperStyle, ...this.props.style}}>

        <div id="main-editor"></div>
      </div>
    );
  }
}
