import React, { Component } from 'react';
import Radium from 'radium'
import themes from "../assets/js/theme.js"




class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPlaceholder: true,
      theme: this.props.theme
    }
    this.style = {
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
        color: themes[this.state.theme].color

      },
    }
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
      <div className={"search-bar " + (this.props.className || "")}
           style={{ ...this.style.base, ...this.props.style }}>
        <div style={{ ...this.style.placeholder,
                     display: this.state.showPlaceholder ? "block" : "none"}} >
          { this.props.placeholder || (
            <p>
              <i className="material-icons" style={this.style.innerPlaceholder}>search</i>
              <span style={this.style.innerPlaceholder}>Search</span>
            </p>
          )}
        </div>
        <input id="search"
               style={this.style.input}
               onChange={ this.handleChange.bind(this) }
               type="text"/>
      </div>

    )
  }
}

export default Radium(SearchBar)
