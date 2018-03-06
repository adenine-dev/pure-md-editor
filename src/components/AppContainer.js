import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';
import style from "../assets/js/style.js"


export default class AppContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      settings: {
        theme: "dark"
      },
      style: StyleSheet.create({
        bg: {
          backgroundColor: style[this.state.settings.theme].main
        }
      })
    }
  }


  render() {
    return (
      <div className="app-container" className={css(this.state.style.bg)}>

      </div>
    )
  }
}
