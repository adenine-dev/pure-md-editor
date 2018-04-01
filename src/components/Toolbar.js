import React, { Component } from 'react';

import { themes } from "../assets/js/theme.js"


export default class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div>
        { this.props.children }
      </div>
    )
  }
}
