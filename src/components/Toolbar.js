import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

import { themes } from "../assets/js/theme.js"
import api from "../assets/js/api.js"


export default class Toolbar extends Component {
  constructor(props) {
    super(props);

    const theme = api.getSetting("theme")

    this.style = StyleSheet.create({
      base: {
        position: "fixed",
        bottom: "0",
        left: "0",
        width: "100%",
        backgroundColor: themes[theme].accent,
        zIndex: "10",
        overflowX: "scroll",
        height: "42px",
        whiteSpace: "nowrap",

      }
    })
  }

  render() {
    return (
      <div className={ css(this.style.base) }>
        { this.props.children }
      </div>
    )
  }
}
