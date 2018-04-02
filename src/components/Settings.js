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
      container:{
        padding: "16px",
        color: themes[theme].color,

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
        <div key={ themeOptions.length }>
          <input type="radio"
                 checked={ theme === this.state.settings.theme }
                 name={ theme }
                 onChange={ this.handleThemeChange.bind(this) }/>
          <p>{ theme }</p>
        </div>
      )
    }

    return (
      <div className={ css(this.style.container) }>
        <h1 className={ css(this.style.headers) }>Settings</h1>
        <div className="theme">
          <h2 className={ css(this.style.headers) }>Theme</h2>
          <div>
            { themeOptions }
          </div>
        </div>
        <div className="fontSize">
          <h2 className={ css(this.style.headers) }>Font Size</h2>
        </div>
        <button onClick={ this.handleSave.bind(this) }>Save</button>
      </div>
    )
  }
}
