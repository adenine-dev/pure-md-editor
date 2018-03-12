import React, { Component } from 'react';
import CodeMirror from 'codemirror';
import keymaps from "../assets/js/codemirror/keymap/keymap.js"

import '../assets/js/codemirror/mode/gfm.js';

import '../assets/js/codemirror/addon/continuelist.js';
import '../assets/js/codemirror/addon/overlay.js';
import '../assets/js/codemirror/addon/closebrackets.js';

import 'codemirror/mode/javascript/javascript.js';
// import 'codemirror/mode/clike/clike.js';


const editorWrapperStyle = {
  width: "90%",
  margin: "32px auto",
  maxWidth: "960px",
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
      value: `\`\`\`javascript
  let i = 0;
\`\`\``,
      mode: {
        name: "gfm",
        highlightFormatting: true,
        ignoreUnderscore: true,
        taskLists: true,
        fencedCodeBlocks: true,
      },
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
      keymap[map.name] = map.action
    })
    editor.addKeyMap( keymap );
    let state = {}
    this.setState({ editor })

  }
  render() {
    console.log(this.state.editor);
    return (
      <div className="editor"
           style={{...editorWrapperStyle, ...this.props.style}}>

        <div id="main-editor"></div>
      </div>
    );
  }
}
