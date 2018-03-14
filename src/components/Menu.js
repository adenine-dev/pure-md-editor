import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import themes from "../assets/js/theme.js"

export default class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: this.props.theme,
      showNav: false
    }
    this.style = {
      menu: {
        color: "rgba(#fff, 0.85)",
        height: "100vh",
        width: "0",
        display: "flex",
        alignItems: "center",
        position: "absolute",
        top: "0",
        left: "100%",
        transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
        backgroundColor: themes[this.state.theme].bg,
        borderTop: "8px solid" + themes[this.state.theme].accent,
        overflow: "hidden",

        active: {
          left: "0",
          width: "100%",

        }
      },
      important: {
        after: {
          content: "",
          position: "absolute",
          height: "80%",
          width: "1px",
          top: "10%",
          left: "0",
          backgroundColor: "rgba(" + themes[this.state.theme].accent + ", 0.2)",
        }
      },
      hamIcoSpans: {
        backgroundColor: themes[this.state.theme].color,
      }
    }
  }

  toggleNav(e) {
    this.setState((state) => ({ showNav: !state.showNav }))
  }

  render() {
    return (
      <div className={ "menu " + this.state.theme } >
        <div className={"ham " + (this.state.showNav ? "active" : "")}
             onClick={ this.toggleNav.bind(this) }>
          <span style={ this.style.hamIcoSpans }></span>
          <span style={ this.style.hamIcoSpans }></span>
          <span style={ this.style.hamIcoSpans }></span>
        </div>
        <div className="nav"
             style={{ ...this.style.menu,
                      ...(this.state.showNav ? this.style.menu.active : {}) }}>
          {this.state.showNav && (
            <div>
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
          )}
        </div>
      </div>
    )
  }
}
