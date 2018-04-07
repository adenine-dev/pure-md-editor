import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite/no-important';

import { themes, breakpoints } from "../assets/js/theme.js"

export default class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: this.props.theme,
      showNav: false
    }
    this.style = StyleSheet.create({
      menu: {
        height: "100vh",
        width: "100%",
        top: "0",
        position: "fixed",
        transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
        backgroundColor: themes[this.state.theme].bg,
        borderTop: "8px solid " + themes[this.state.theme].accent,
        overflow: "hidden",
        zIndex: "10000",
      },
      active: {
        left: "0",
      },
      hidden: {
        left: "100%",
      },
      important: {
        padding: "64px",
        position: "relative",
        flex: "4",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        [breakpoints.tablet]: {
          width: "100%",
          flex: "1"
        },
        ":after": {
          content: "''",
          position: "absolute",
          height: "80%",
          width: "1px",
          bottom: "10%",
          left: "0",
          opacity: "0.2",
          backgroundColor: themes[this.state.theme].accent,
          [breakpoints.tablet]: {
            width: "80%",
            height: "1px",
            left: "10%",
            bottom: "0",
          },
        },
      },
      side: {
        // flex: "1",
        padding: "16px",
        width: "200px",
        [breakpoints.tablet]: {
          width: "100%",
          padding: "64px"
        },
      },
      menuContentContainer: {
        color: themes[this.state.theme].color,
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        position: "relative",
      [breakpoints.tablet]: {
          flexDirection: "column-reverse"
        }
      },
      importantH2: {
        fontWeight: "300",
        fontSize: "64px",
        lineHeight: "1.6em",
        [breakpoints.tablet]: {
          fontSize: "56px"
        },
        [breakpoints.phone]: {
          fontSize: "48px"
        },
        [breakpoints.small]: {
          fontSize: "32px"
        },
      },
      li: {
        marginBottom: "16px",
        fontSize: "16px",
        [breakpoints.tablet]: {
          fontSize: "24px",
        },
        [breakpoints.small]: {
          fontSize: "16px",
        },
      },
      hamIcoSpans: {
        backgroundColor: themes[this.state.theme].color,
      },
      hoverItem: {
        position: "relative",
        display: "table",
        cursor: "pointer",
        ":after": {
          content: "''",
          position: "absolute",
          display: "block",
          height: "40%",
          opacity: "0.4",
          top: "60%",
          left: "0",
          backgroundColor: themes[this.state.theme].accent,
          transition: "all 0.3s 0.05s cubic-bezier(.25,.8,.25,1)",
          width: "0",
          zIndex: "-1",

        },
        ":hover": {
          ":after": {
            width: "100%"
          }
        }
      },
    })
  }

  toggleNav(e) {
    this.setState((state) => ({ showNav: !state.showNav }))
  }

  render() {
    return (
      <div className={ "menu " + this.state.theme } >
        <div className={"ham " + (this.state.showNav ? "active" : "")}
             onClick={ this.toggleNav.bind(this) }>
          <span className={ css(this.style.hamIcoSpans) }></span>
          <span className={ css(this.style.hamIcoSpans) }></span>
          <span className={ css(this.style.hamIcoSpans) }></span>
        </div>
        <div className={ css([this.style.menu, (this.state.showNav ? this.style.active : this.style.hidden)])} >
          {this.state.showNav && (
            <div className={ "menu-option-container " + css(this.style.menuContentContainer)}>
              <div className={"side " + css(this.style.side)}>
                <ul>
                  <li className={"hover-effect " + css(this.style.hoverItem, this.style.li)}
                      onClick={ this.toggleNav.bind(this)}>
                      <Link to="/app/settings/">
                        Settings
                      </Link>
                  </li>
                  <li className={"hover-effect " + css(this.style.hoverItem, this.style.li)}
                      onClick={ this.toggleNav.bind(this)}>
                        Markdown cheetsheet
                  </li>
                  <li className={"hover-effect " + css(this.style.hoverItem, this.style.li)}
                      onClick={ this.toggleNav.bind(this)}>
                        Hotkeys
                  </li>
                  <li className={"hover-effect " + css(this.style.hoverItem, this.style.li)}
                      onClick={ this.toggleNav.bind(this)}>
                        here
                  </li>
                </ul>
              </div>
              <div className={ "important " + css(this.style.important) } >
                <span className={ "separator" + css(this.style.separator) }></span>
                <h2 className={ css(this.style.importantH2) }>
                  <Link className={"hover-effect " + css(this.style.hoverItem)}
                          to="/app/projects/"
                          onClick={ this.toggleNav.bind(this) }>
                    Projects
                  </Link>
                </h2>
                <h2 className={ css(this.style.importantH2) }>
                  <Link className={"hover-effect " + css(this.style.hoverItem)}
                          to="/app/edit/new/default/"
                          onClick={ this.toggleNav.bind(this) }>
                    New Project
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
