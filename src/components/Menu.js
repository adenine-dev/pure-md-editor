import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import themes from "../assets/js/theme.js"

export default class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      settings: {
        theme: this.props.theme,
      },
    }
    this.style = {
      menu: {
        color: "rgba(#fff, 0.85)",
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        position: "absolute",
        top: "100%",
        transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
        borderTop: "8px solid" + themes[this.state.settings.theme].accent,
      },
      important: {
        after: {
          content: "",
          position: "absolute",
          height: "80%",
          width: "1px",
          top: "10%",
          left: "0",
          backgroundColor: "rgba(" + themes[this.state.settings.theme].accent + ", 0.2)",
        }
      }
    }
  }


  render() {
    return (
      <div className={ "menu " + this.state.settings.theme }
           style={ this.style.menu }>
        <div id="ham">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="nav" id="nav">
          <div className="side">
            <ul>
              <li>Settings</li>
              <li>I don't know</li>
              <li>what to put</li>
              <li>here</li>
            </ul>
          </div>
          <div className="important" style={ this.style.important }>
            <h2><Link to="/app/projects/">Projects</Link></h2>
            <h2><Link to="/app/edit/new/default/">New Document</Link></h2>
          </div>
        </div>
      </div>
    )
  }
}
