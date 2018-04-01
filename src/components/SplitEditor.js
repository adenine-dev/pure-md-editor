import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Mousetrap from "mousetrap"
import { StyleSheet, css } from 'aphrodite/no-important';
import { ScrollSync, ScrollSyncPane } from "react-scroll-sync"
import CodeMirrorEditor from "./CodeMirrorEditor.js"
import MarkdownRenderer from "./MarkdownRenderer.js"

import api from "../assets/js/api.js"

import { themes, breakpoints } from "../assets/js/theme.js"
import "../assets/js/globalbind.js"



export default class SplitEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      project: props.project,
      theme: api.getSetting("theme"),
    }
    this.style = StyleSheet.create({
      splitter: {
        display: "flex",
        justifyContent: "space-around",
        overflow: "hidden",
        position: "relative",
        width: "90%",
        margin: "0 auto",
        flex: "1",
        height: "calc(100vh - 24px)",
        [breakpoints.tablet]: {
          flexDirection: "column",
        }
      },
      splitItem: {
        width: "50%",
        margin: "40px 0",
        overflowY: "scroll",
        height: "100%",
        [breakpoints.tablet]: {
          width: "100%"
        }
      },
      divBar: {
        width: "1px",
        height: "80%",
        backgroundColor: themes[this.state.theme].accent,
        position: "absolute",
        opacity: "0.2",
        bottom: "64px",
        [breakpoints.tablet]: {
          width: "80%",
          left: "10%",
          height: "1px",
          bottom: "50%"
        }
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({project: nextProps.project})
  }

  handleCmChange(cm) {
    let project = {...this.state.project};
    project.value = cm.getValue()
    this.setState({ project })
    if(this.props.onChange) {
      this.props.onChange(cm)
    }
  }

  handleScrollSync(e) {
    // const el = document.getElementsByClassName("split-item");
    // for(let i = 0; i < el.length; i++) {
    //   if(e.target !== el[i]) {
    //     el[i].scrollY = e.target.scrollY
    //   }
    // }
  }

  render() {
    return (
      <div className="split-editor">
        <ScrollSync>
          <div className={"spit-view " + css(this.style.splitter) }>
            <ScrollSyncPane>
              <div className={ "syncscroll " + css(this.style.splitItem) }
                   onScroll={ this.handleScrollSync.bind(this) }>
                <CodeMirrorEditor defaultValue={ this.state.project.value }
                                  onChange={ this.handleCmChange.bind(this) } />
              </div>
            </ScrollSyncPane>
            <div className={ css(this.style.divBar) } ></div>
            <ScrollSyncPane>
              <div className={ "syncscroll " + css(this.style.splitItem) }
                onScroll={ this.handleScrollSync.bind(this) }>
                <MarkdownRenderer markdown={ this.state.project.value } />
              </div>
            </ScrollSyncPane>
          </div>
        </ScrollSync>
      </div>
    )
  }
}
