import React, { Component } from 'react';
import Radium from 'radium'
import theme from "../assets/js/theme.js"


const style = {
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
    backgroundColor: theme.themes[theme.getTheme()].bg,
    color: theme.themes[theme.getTheme()].color
  },
  placeholder: {
    position: "absolute",
    fontSize: "16px",
    width: "100%",
    padding: "16px 32px",
    pointerEvents: "none",

  },
  innerPlaceholder: {
    verticalAlign: "middle",
    padding: "0 2px",
    color: theme.themes[theme.getTheme()].color

  },
}

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPlaceholder: true,
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
           style={{ ...style.base, ...this.props.style }}>
        <div style={{...style.placeholder,
                     display: this.state.showPlaceholder ? "block" : "none"}} >
          { this.props.placeholder || (
            <p>
              <i className="material-icons"
                 style={{ ...style.innerPlaceholder }}>search</i>
              <span style={{ ...style.innerPlaceholder }}>Search</span>
            </p>
          )}
        </div>
        <input id="search"
               style={{ ...style.input }}
               onChange={ this.handleChange.bind(this) }
               type="text"/>
      </div>

    )
  }
}

export default Radium(SearchBar)
