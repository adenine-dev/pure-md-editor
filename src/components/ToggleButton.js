import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

import api from "../assets/js/api.js"
import { themes } from "../assets/js/theme.js"


export default class RadioCluster extends Component {
  constructor(props) {
    super(props)
    this.state = {
      enabled: props.defaultValue
    }
    const theme = api.getSetting("theme")
    this.style = StyleSheet.create({
      wrapper: {
        position: "relative",
        border: "1px solid " + themes[theme].accent,
        height: "32px",
        width: "64px",
        display: "inline-block"
      },
      input: {
        opacity: "0",
        position: "absolute",
        height: "100%",
        width: "100%",
        cursor: "pointer",
        ":checked + span": {
          backgroundColor: themes[theme].accent,
          ":after": {
            left: "34px"
          }
        }
      },
      slider: {
        height: "100%",
        width: "100%",
        pointerEvents: "none",
        position: "absolute",
        transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
        ":after": {
          content: "''",
          position: "absolute",
          height: "24px",
          width: "24px",
          top: "3px",
          left: "3px",
          transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
          backgroundColor: themes[theme].color
        }
      }
    })
  }

  handleChange(e) {
    this.setState({enabled: e.target.checked})
    if(this.props.onChange) {
      this.props.onChange(e)
    }
  }

  render() {
    return (
      <div className={ css(this.style.wrapper) }>
        <input type="checkbox"
               onChange={ this.handleChange.bind(this) }
               checked={ this.state.enabled }
               className={ css(this.style.input) }/>
        <span className={ css(this.style.slider) }></span>
      </div>
    )
  }
}
