import React, { Component } from 'react';
import cledit from '../assets/js/cledit/index.js';
import { StyleSheet, css } from 'aphrodite/no-important';
import Prism from 'prismjs';
import loadLanguages from 'prismjs/components/index.js';


// import keymaps from "../assets/js/codemirror/keymap/keymap.js"




export default class CleditEditor extends Component {
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
        margin: "64px auto",
        maxWidth: "960px",
      }
    })
  }
  componentDidMount() {
    const editor = cledit(this.editor, this.scroller);
    loadLanguages(["markdown"])
    editor.init({
      content: this.state.value,
      unusedthing: console.log(Prism.languages),
      sectionHighlighter: section => Prism.highlight(section.text, Prism.languages["markdown"]),
    });

    // let _editor = CodeMirror(this.cm, {
    //   mode: {
    //     name: "gfm",
    //     highlightFormatting: true,
    //     ignoreUnderscore: true,
    //     taskLists: true,
    //     fencedCodeBlocks: true,
    //     underline: true,
    //   },
    //   value: this.state.value,
    //   placeholder: "write something",
    //   autofocus: true,
    //   addModeClass: true,
    //   indentUnit: 2,
    //   tabSize: 2,
    //   enableCompositionMod: true,
    //   autoCloseBrackets: true,
    //   lineWrapping: true,
    //   enableCompositionMod: true,
    //   inputStyle: "contenteditable",
    //   extraKeys: {
    //     "Enter": "newlineAndIndentContinueMarkdownList",
    //   },
    // })
    //
    // let keymap = {};
    // for(let i = 0; i < keymaps.length; i++) {
    //   if(keymaps[i].cm) {
    //     keymap[keymaps[i].name] = keymaps[i].action
    //   }
    // }
    // if(this.props.onChange) {
    //   editor.on("change", (cm) => {
    //     this.props.onChange(cm)
    //   })
    // }
    //
    // editor.addKeyMap( keymap );
    // this.setState({ editor })

    window.rotide = editor

    if(this.props.onMount) {
      this.props.onMount(this.state, editor)
    }

  }


  render() {
    return (
      <div className={ css([this.style.editorWrapperStyle, this.props.style]) + " editor"} >
        <div ref={(scroller) => { this.scroller = scroller }}>
          <div id="main-editor"
               className={ this.state.theme }
               ref={(editor) => { this.editor = editor }}></div>
        </div>
      </div>
    );
  }
}
