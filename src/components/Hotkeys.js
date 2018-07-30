import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

import { themes } from "../assets/js/theme.js"
import api from "../assets/js/api.js"
import keymaps from "../assets/js/codemirror/keymap/keymap.js"

export default class Hotkeys extends Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: api.getSetting("theme"),
    }
    this.style = StyleSheet.create({
      icon: {
        color: themes[this.state.theme].accent,
        verticalAlign: "middle",
        width: "42px",
        fontSize: "28px",
        display: "inline-flex"
      },
      container: {
        margin: "96px auto",
        width: "90%",
        maxWidth: "960px",
      },
      itemContainer: {
        display: "flex",
        margin: "16px",
        justifyContent: "space-between",
        color: themes[this.state.theme].color,
        fontSize: "18px"
      },
      inline: {
        display: "flex",
        justifyContent: "space-between",
        verticalAlign: "middle",
        alignItems: "center",
      }
    })
  }

  render() {
    const hotkeys = keymaps.map((hotkey, i) => (
      <div key={ i } class={ css(this.style.itemContainer) }>
        <div class={ css(this.style.inline) }>
          <i className={"material-icons " + css(this.style.icon) }>{ hotkey.icon }</i>
          <p>{ hotkey.name.replace(/-/g, "+").toUpperCase() }</p>
        </div>
        <span>
          <p>{ hotkey.description }</p>
        </span>
      </div>
    ))
    console.log(hotkeys)
    return (
      <div className={ css(this.style.container) + " hotkeys " + this.state.theme } >
        { hotkeys }
      </div>
    )
  }
}
