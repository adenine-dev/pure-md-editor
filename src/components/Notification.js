import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

import { themes, breakpoints } from "../assets/js/theme.js"
import api from "../assets/js/api.js"

export default class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: props.show,
      theme: api.getSetting("theme"),
      timedHide: !!props.timedHide,
      displayTimer: null,
    }

    this.style = StyleSheet.create({
      base: {
        position: "fixed",
        width: "100%",
        maxWidth: "480px",
        left: "calc(50% - 240px)",
        backgroundColor: themes[this.state.theme].accent,
        padding: "8px 16px",
        zIndex: "1000",
        overflow: "hidden",
        transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
        [breakpoints.phone]: {
          maxWidth: "100%",
          width: "100%",
          left: "0"
        }
      },
      hide: {
        opacity: "0",
        top: "-50px",
        pointerEvents: "none",
      },
      show: {
        opacity: "1",
        top: "0",
        pointerEvents: "auto",
      },
      close: {
        position: "absolute",
        top: "calc(50% - 12px)",
        height: "24px",
        width: "24px",
        right: "8px",
        backgroundColor: "transparent",
        verticalAlign: "middle",
        cursor: "pointer",
        color: "inherit"
      },
    })
  }

  handleClose(e) {
    this.setState({ show: false })
    if(this.props.onClose) {
      this.props.onClose(e)
    }
  }

  createTimer() {
    // console.log(!this.state.timedHide && !this.state.displayTimer);
    // console.log(!this.state.timedHide)
    // console.log(!this.state.displayTimer)
    if(!this.state.timedHide && !this.state.displayTimer) {
      this.setState({displayTimer: setTimeout(() => {
        this.setState({ show: false })
        if(this.props.onClose) {
          this.props.onClose(false)
        }
        this.setState({displayTimer: null})
      }, 4000)})
    } else {
      this.setState({displayTimer: null})
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({ show: !!nextProps.show })
    this.setState({ timedHide: !!nextProps.timedHide })

    this.createTimer()
  }

  componentDidMount() {
    this.createTimer()
  }

  render() {
    return (
      <div className={ css([this.style.base, this.props.style, (this.state.show ? this.style.show : this.style.hide)]) } >
        { this.props.children }
        <button onClick={ this.handleClose.bind(this) } className={ css(this.style.close) } >
          <i className="material-icons" >clear</i>
        </button>
      </div>
    )
  }
}
