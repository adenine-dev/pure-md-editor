import React, { Component } from 'react';
import showdown from 'showdown';
import "showdown-prettify"
import Prism from "prismjs"
import { StyleSheet, css } from 'aphrodite/no-important';

import { themes } from "../assets/js/theme.js"
import api from "../assets/js/api.js"

export default class MarkdownRenderer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: props.markdown,
      renderedMD: "",
      converter: new showdown.Converter({
        extensions: ['prettify'],
        strikethrough: true,
        emoji: true,
        parseImgDimensions: true,
        simplifiedAutoLink: true,
        literalMidWordUnderscores: true,
        tasklists: true,
        underline: true,
        splitAdjacentBlockquotes: true,
      }),
      theme: api.getSetting("theme"),
    }
    this.style = StyleSheet.create({
      renderer: {
        width: "90%",
        margin: "64px auto",
        maxWidth: "960px",
        height: "auto",
      }
    })
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if(nextProps.markdown !== this.props.markdown) {
      this.setState({markdown: nextProps.markdown})
      this.setState({renderedMD: this.state.converter.makeHtml(nextProps.markdown)})
    }
  }

  componentDidUpdate() {
    this.renderer.innerHTML = this.state.renderedMD
    const codeBlocks = this.renderer.querySelectorAll("pre code");
    for(let i = 0; i < codeBlocks.length; i++) {
      Prism.highlightAllUnder(this.renderer)
    }
  }

  UNSAFE_componentWillMount() {
    let converter = {...this.state.converter}
    converter.setFlavor('github');
    this.setState({ converter })
    this.setState({renderedMD: this.state.converter.makeHtml(this.state.markdown)})

  }

  componentDidMount() {
    this.renderer.innerHTML = this.state.renderedMD
  }

  render() {
    return (
      <div className={"markdown-renderer " + this.state.theme + " " + css([this.style.renderer, this.props.style])}
           ref={(renderer) => {this.renderer = renderer}}>
      </div>
    )
  }
}
