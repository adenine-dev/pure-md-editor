import React, { Component } from 'react';

import themes from "../assets/js/theme.js"
import api from "../assets/js/api.js"

export default class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      theme: api.getSetting("theme")
    }
    this.style = {
      base: {
        position: "fixed",
        width: "480px",
        top: "0",
        left: "calc(50% - 240px)",
        backgroundColor: themes[this.state.theme].accent,
        padding: "8px 16px",
        zIndex: "10",
        overflow: "hidden",
        opacity: "1",
        transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
        hide: {
          opacity: "0",
          top: "-50px",
          pointerEvents: "none",
        }
      },
      close: {
        position: "absolute",
        top: "calc(50% - 12px)",
        height: "24px",
        width: "24px",
        right: "8px",
        backgroundColor: "transparent",
        verticalAlign: "middle",
        cursor: "pointer"
      },
    }
  }
  handleClose(e) {
    this.setState({ show: false })
    if(this.props.onClose) {
      this.props.onClose(e)
    }
  }
  render() {
    return (
      <div className={"notification " + this.props.className}
           style={this.state.show ? {...this.style.base, ...this.props.style} : {...this.style.base, ...this.props.style, ...this.style.base.hide}} >
        { this.props.children }
        <button onClick={ this.handleClose.bind(this) } style={this.style.close} >
          <i className="material-icons">clear</i>
        </button>
      </div>
    )
  }
}
