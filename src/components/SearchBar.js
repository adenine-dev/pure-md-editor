import React, { Component } from 'react';
import { themes } from "../assets/js/theme.js"
import { StyleSheet, css } from 'aphrodite/no-important';;




export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPlaceholder: true,
      theme: this.props.theme
    }
    this.style = StyleSheet.create({
      base: {
        position: "relative",
        display: "flex",
        alignItems: "center",
        height: "56px"
      },
      input: {
        position: "absolute",
        fontSize: "16px",
        width: "100%",
        padding: "8px 2px 2px 2px",
        verticalAlign: "middle",
        backgroundColor: themes[this.state.theme].bg,
        color: themes[this.state.theme].color
      },
      placeholder: {
        position: "absolute",
        fontSize: "16px",
        width: "100%",
        padding: "8px 2px 2px 2px",
        pointerEvents: "none",
        zIndex: "1"
      },
      innerPlaceholder: {
        verticalAlign: "middle",
        padding: "0 2px",
        color: themes[this.state.theme].color,
        opacity: "0.4",

      },
    })
  }

  handleChange(e) {
    let target = e.target
    this.setState({showPlaceholder: target.value === ""})
    if(this.props.onChange) {
      this.props.onChange(e)
    }
  }

  render() {
    return (
      <div className={"search-bar " + (this.props.className || "") + " " +
                      css([this.style.base, this.props.style])} >
        <div style={{ display: this.state.showPlaceholder ? "block" : "none" }}
             className={ css(this.style.placeholder) }>
          { this.props.placeholder || (
            <p>
              <i className={ css(this.style.innerPlaceholder) + " material-icons" }>search</i>
              <span className={ css(this.style.innerPlaceholder) }>Search</span>
            </p>
          )}
        </div>
        <input id="search"
               className={ css(this.style.input) }
               onChange={ this.handleChange.bind(this) }
               type="text"/>
      </div>

    )
  }
}
