import React, { Component } from 'react';

import api from "../assets/js/api.js"
import { themes } from "../assets/js/theme.js"

export default class AppContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      settings: api.getSettings(),
      shouldRedirect: false
    }
  }

  handleThemeChange(e) {
    const settings = {...this.state.settings}
    settings.theme = e.target.name
    this.setState({ settings })
  }

  handleSave(e) {
    api.setSettings(this.state.settings);
    this.setState({shouldRedirect: true})
  }

  render() {
    if(this.state.shouldRedirect) {
      
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
      <div>
        <h1>Settings</h1>
        <div className="theme">
          <h2>Theme</h2>
          <div>
            { themeOptions }
          </div>
        </div>
        <div className="fontSize">
          <h2>Font Size</h2>
        </div>
        <button onClick={ this.handleSave.bind(this) }>Save</button>
      </div>
    )
  }
}
