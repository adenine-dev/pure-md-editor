import React, { Component } from 'react';
import CodeMirror from 'codemirror';



const editorWrapperStyle = {
  width: "90%",
  margin: "32px auto",
  maxWidth: "960px",
  fontFamily: "Roboto"
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
      mode: "markdown",
      autofocus: true,

    })

    this.setState({editor})

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
