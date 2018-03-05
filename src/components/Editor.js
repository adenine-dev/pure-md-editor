import React, { Component } from 'react';
import CodeMirror from 'codemirror';



const editorWrapperStyle = {
  width: "90%",
  margin: "32px auto",
  maxWidth: "960px",
  fontFamily: "Roboto, sans-serif",
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
      highlightFormatting: true

    })
    editor.addKeyMap({
      // bold
      'Ctrl-B': (cm) => {
          var s = cm.getSelection(),
              t = s.slice(0, 2) === '**' && s.slice(-2) === '**';
          cm.replaceSelection(t ? s.slice(2, -2) : '**' + s + '**', 'around');
      },
      // italic
      'Ctrl-I': (cm) => {
          var s = cm.getSelection(),
              t = s.slice(0, 1) === '*' && s.slice(-1) === '*';
          cm.replaceSelection(t ? s.slice(1, -1) : '*' + s + '*', 'around');
      },

    });
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
