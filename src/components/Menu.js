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
        height: "100vh",
        width: "0",
        top: "0",
        left: "100%",
        position: "fixed",
        transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
        backgroundColor: themes[this.state.theme].bg,
        borderTop: "8px solid" + themes[this.state.theme].accent,
        overflow: "hidden",
        zIndex: "10",
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
      },
      hover: {
        position: "absolute",
        display: "block",
        height: "40%",
        opacity: "0.4",
        top: "60%",
        left: "0",
        backgroundColor: themes[this.state.theme].accent,
        transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
      },
      separator: {
        position: "absolute",
        height: "80%",
        width: "1px",
        top: "10%",
        left: "0",
        opacity: "0.2",
        backgroundColor: themes[this.state.theme].accent,
      },
      flex: {
        color: themes[this.state.theme].color,
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        position: "relative",
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
            <div style={ this.style.flex } className="menu-option-container">
              <div className="side">
                <ul>
                  <li className="hover-effect"
                      onClick={ this.toggleNav.bind(this)}>
                        Settings<span style={ this.style.hover }></span>
                  </li>
                  <li className="hover-effect"
                      onClick={ this.toggleNav.bind(this)}>
                        I don't know<span style={ this.style.hover }></span>
                  </li>
                  <li className="hover-effect"
                      onClick={ this.toggleNav.bind(this)}>
                        what to put<span style={ this.style.hover }></span>
                  </li>
                  <li className="hover-effect"
                      onClick={ this.toggleNav.bind(this)}>
                        here<span style={ this.style.hover }></span>
                  </li>
                </ul>
              </div>
              <div className="important" style={ this.style.important }>
                <span className="separator" style={ this.style.separator }></span>
                <h2><Link className="hover-effect"
                          to="/app/projects/"
                          onClick={ this.toggleNav.bind(this) }>Projects
                          <span style={ this.style.hover }></span>
                    </Link>
                  </h2>
                <h2><Link className="hover-effect"
                          to="/app/edit/new/default/"
                          onClick={ this.toggleNav.bind(this) }>New Project
                          <span style={ this.style.hover }></span>
                    </Link>
                  </h2>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}
