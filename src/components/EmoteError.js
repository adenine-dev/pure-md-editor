import React, { Component } from 'react';

import { themes } from "../assets/js/theme.js"



export default class EmoteError extends Component {
  constructor(props) {
    super(props)
    this.emotes = [
      "( 　ﾟ,_ゝﾟ)",
      "¯\\_(ツ)_/¯",
      "Σ(ﾟДﾟ；≡；ﾟдﾟ)",
      "щ（ﾟДﾟщ",
      "ಠ╭╮ಠ",
      "ಥ﹏ಥ",
      "⊙▃⊙",
      "◉︵◉",
      "(╯°□°）╯︵ ┻━┻",
      "(ﾟДﾟ)",
    ]
  }
  render() {
    return (
      <div className="error">
        <p style={{ ...this.props.style }}>
          { this.emotes[Math.floor(Math.random() * this.emotes.length)] }
        </p>
        { this.props.children }
      </div>
    )
  }
}
