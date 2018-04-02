import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { StyleSheet, css } from 'aphrodite/no-important';

import api from "../assets/js/api.js"
import { themes } from "../assets/js/theme.js"

export default class AppContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      settings: api.getSettings(),
      shouldRedirect: false
    }
    const theme = this.state.settings.theme
    this.style = StyleSheet.create({
      headers: {
        fontWeight: 300,
        marginBottom: "1em",
      },
      h1: {
        fontSize: "52px"
      },
      h2: {
        fontSize: "32px"
      },
      container: {
        color: themes[theme].color,
        padding: "16px",
        width: "90%",
        maxWidth: "720px",
        margin: "0 auto"
      },
      option: {
        marginBottom: "48px"
      },
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
      saveButton: {
        backgroundColor: themes[theme].accent,
        position: "fixed",
        bottom: "16px",
        right: "16px",
        padding: "8px 16px",
        border: themes[theme].color
      },
      input: {
        borderBottom: "4px solid " + themes[theme].accent,
        padding: "4px 8px",
        backgroundColor: "transparent",
        color: themes[theme].color,
        display: "inline"
      },
      p: {
        opacity: "0.6",
        fontSize: "12px",
        display: "inline-block"
      }
    })
  }

  handleThemeChange(e) {
    const settings = {...this.state.settings}
    settings.theme = e.target.name
    this.setState({ settings })
  }

  handleText(e) {
    const settings = {...this.state.settings}
    settings[e.name] = e.target.value;
    this.setState({ settings })
  }

  handleSave(e) {
    api.setSettings(this.state.settings);
    this.setState({shouldRedirect: true})
  }

  handleFontNumChange(e) {
    const settings = {...this.state.settings}
    if(e.target.value >= e.target.min && e.target.value <= e.target.max) {
      settings[e.target.name] = e.target.value
      this.setState({ settings })
    } else {
      e.target.value = settings[e.target.name]
    }
  }

  render() {
    if(this.state.shouldRedirect) {
      // TODO: make this better and not make a bunch of half rendered garbage
      window.location.reload()

      return (
        <Redirect to="/app/projects/" />
      )
    }

    const themeOptions = []
    for(let theme in themes) {
      themeOptions.push(
        <div key={ themeOptions.length }
             className={ css(this.style.radioContainer) }>
          <input type="radio"
                 className={ css(this.style.radio) }
                 checked={ theme === this.state.settings.theme }
                 name={ theme }
                 onChange={ this.handleThemeChange.bind(this) }/>
          <p className={ css(this.style.radioLabel) }>{ theme }</p>
        </div>
      )
    }

    return (
      <div className={ css(this.style.container) }>
        <h1 className={ css(this.style.headers) }>Settings</h1>
        <div className={ css(this.style.option) }>
          <h2 className={ css(this.style.headers) }>Theme</h2>
          <div>
            { themeOptions }
          </div>
        </div>
        <div className={ css(this.style.option) }>
          <h2 className={ css(this.style.headers) }>Font Size</h2>
          <input type="number"
                 min="1"
                 max="Infinity"
                 className={ css(this.style.input) }
                 defaultValue={ this.state.settings.fontSize }
                 onChange={ this.handleFontNumChange.bind(this) }/><p className={ css(this.style.p) }>px</p>
          <br/>
          <p className={ css(this.style.p) }>Different Fonts may have different sizes regardless of if they have the same px size</p>
        </div>
        <button onClick={ this.handleSave.bind(this) }
                className={ css(this.style.saveButton) }>Save</button>
      </div>
    )
  }
}
