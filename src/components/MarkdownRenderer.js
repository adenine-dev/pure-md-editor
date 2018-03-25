import React, { Component } from 'react';
import showdown from 'showdown';

import themes from "../assets/js/theme.js"
import api from "../assets/js/api.js"

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: props.markdown,
      converter: new showdown.Converter({
        strikethrough: true,
        emoji: true,
        parseImgDimensions: true,
        simplifiedAutoLink: true,
        literalMidWordUnderscores: true,
        tasklists: true,
        underline: true,
      }),
      theme: api.getSetting("theme"),
    }
    this.style = {
      renderer: {
        width: "90%",
        margin: "32px auto",
        maxWidth: "960px",
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.markdown !== this.props.markdown) {
      this.setState({markdown: nextProps.markdown})
    }
  }
  componentDidUpdate() {
    this.renderer.innerHTML = this.state.converter.makeHtml(this.state.markdown)
  }
  componentWillMount() {
    let converter = {...this.state.converter}
    converter.setFlavor('github');
    this.setState({ converter })

  }
  componentDidMount() {
    this.renderer.innerHTML = this.state.converter.makeHtml(this.state.markdown)
    console.log(this.state.converter.getOptions());
  }
  render() {
    return (
      <div className={"markdown-renderer " + this.state.theme}
           style={{ ...this.style.renderer, ...this.props.style }}
           ref={(renderer) => {this.renderer = renderer}}>
      </div>
    )
  }
}
