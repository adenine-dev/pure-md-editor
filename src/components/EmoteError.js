import React, { Component } from 'react';
import { css } from 'aphrodite/no-important';

import { themes } from "../assets/js/theme.js"

const emotes = [
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

export default class EmoteError extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="error">
        <p className={ css(this.props.style) }>
          { emotes[Math.floor(Math.random() * emotes.length)] }
        </p>
        { this.props.children }
      </div>
    )
  }
}
