import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';

import { themes } from "../assets/js/theme.js"

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
        borderTop: "8px solid" + themes[this.state.theme].accent,
        overflow: "hidden",
        zIndex: "10",
      },
      active: {
        left: "0",
      },
      hidden: {
        left: "100%",
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
      menuContentContainer: {

      },
      importantH2: {
        fontWeight: "300",
        fontSize: "64px",
        lineHeight: "1.6em",
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
        <div className={ css([this.style.menu, (this.state.showNav ? this.style.active : this.style.hidden)]) + " nav"} >
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
                <span className={ "separator" + css(this.style.separator) }></span>
                <h2 className={ css(this.style.importantH2) }>
                  <Link className="hover-effect"
                          to="/app/projects/"
                          onClick={ this.toggleNav.bind(this) }>
                          Projects
                          <span className={ css(this.style.hover) }></span>
                    </Link>
                  </h2>
                <h2 className={ css(this.style.importantH2) }>
                  <Link className="hover-effect"
                          to="/app/edit/new/default/"
                          onClick={ this.toggleNav.bind(this) }>
                          New Project
                          <span className={ css(this.style.hover) }></span>
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
