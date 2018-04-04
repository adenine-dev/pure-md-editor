import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

import api from "../assets/js/api.js"
import { themes } from "../assets/js/theme.js"


export default class RadioCluster extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: props.defaultValue
    }
    const theme = api.getSetting("theme")
    this.style = StyleSheet.create({
      radio: {
        opacity: 0,
        height: "100%",
        width: "100%",
        position: "absolute",
        top: "0",
        left: "0",
        cursor: "pointer",
        ":checked + p": {
          backgroundColor: themes[theme].accent,
          ":after": {
            // backgroundColor: themes[theme].accent
          }
        },
        ":hover + p": {
          ":after": {
            backgroundColor: themes[theme].accent
          }
        }
      },
      radioContainer: {
        position: "relative",
        marginBottom: "4px",
        maxWidth: "120px",
        border: "1px solid " + themes[theme].accent
      },
      radioLabel: {
        padding: "8px 16px",
        backgroundColor: "transparent",
        transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
        position: "relative",
        pointerEvents: "none",
        ":after": {
          content: "''",
          position: "absolute",
          display: "block",
          height: "12px",
          width: "12px",
          border: "4px solid " + themes[theme].bg,
          borderRadius: "50%",
          top: "calc(50% - 10px)",
          right: "8px",
          transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
        }
      },
    })
  }

  handleChange(e) {
    this.setState({selected: e.target.name})
    if(this.props.onChange) {
      this.props.onChange(e)
    }
  }

  render() {

    const radios = this.props.options.map((item, i) => (
      <div key={ i }
           className={ css(this.style.radioContainer) }>
        <input type="radio"
               className={ css(this.style.radio) }
               checked={ item === this.state.selected }
               name={ item }
               onChange={ this.handleChange.bind(this) }/>
        <p className={ css(this.style.radioLabel) }>{ item }</p>
      </div>
    ))


    return (
      <div>
        { radios }
      </div>
    )
  }
}
