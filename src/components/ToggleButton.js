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
      <div>
        <input type="checkbox"
               onChange={ this.handleChange.bind(this) }
               checked={ this.state.enabled }/>
        <span></span>
      </div>
    )
  }
}
