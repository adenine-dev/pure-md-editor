import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Radium from 'radium'

import api from "../assets/js/api.js"
import themes from "../assets/js/theme.js"

import SearchBar from "./SearchBar.js"
import EmoteError from "./EmoteError.js"
import Notification from "./Notification.js"


class ProjectList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: api.getProjects() || {},
      filteredList: api.getProjects() || {},
      theme: api.getSetting("theme"),
      notification: {
        value: "",
        show: false,
        name: "warning",
        timeout: false
      },
    }
    this.style = {
      noteList: {
        margin: "8px auto",
        width: "90%",
        maxWidth: "960px",
        padding: "8px 16px",
      },
      listItem: {
        marginBottom: "16px",
        display: "flex",
        alignItems: "center",
        a: {
          color: themes[this.state.theme].color,
          flex: "3",
          padding: "8px",
          opacity: "0.8",
        },
        actions: {
          flex: "1",
          padding: "0 16px",
          borderLeft: "1px solid " + themes[this.state.theme].accent,
          display: "flex",
          justifyContent: "space-around",
        },
      },
      button: {
        background: "transparent",
        color: themes[this.state.theme].color,
        opacity: "0.4",
        transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
        cursor: "pointer",
        ":hover": {
          opacity: "0.8"
        }
      },
      icon: {
        verticalAlign: "middle",
      },
      header: {
        width: "100%",
        color: themes[this.state.theme].color,
        padding: "16px 32px",
        marginBottom: "16px",
        fontSize: "32px",
      },
      placeholder: {
        textAlign: "center",
        opacity: "0.4",
        color: themes[this.state.theme].color,
        fontSize: "48px",
        fontWeight: "300"
      },
      placeholderLink: {
        transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
        ":hover": {
          opacity: "1",

        }
      },
      searchBar: {
        borderBottom: "1px solid " + themes[this.state.theme].color,
        marginBottom: "32px",

      },
      warning: {
        backgroundColor: themes[this.state.theme].error,
        color: themes[this.state.theme].color,
      },
      deleteButton: {
        border: "1px solid " + themes[this.state.theme].color,
        color: themes[this.state.theme].color,
        padding: "4px",
        background: "transparent",
        cursor: "pointer",
        marginRight: "16px",
        textAlign: "center",
      }
    }
  }

  filterList(e) {
    let filteredList = {}
    for(let key in this.state.list) {
      if(this.state.list[key].name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1) {
        filteredList[key] = this.state.list[key]
      }
    }
    this.setState({filteredList})
  }

  deleteProject(e, name) {
    api.deleteProject(name)
    let notification = {...this.state.notification};
    notification.show = true
    notification.name = "warning"
    notification.value = "project was deleted"
    notification.timeout = false
    this.setState({ notification })
  }

  promptDeleteProject(e, name) {
    let notification = {...this.state.notification};
    notification.show = true
    notification.name = "warning"
    notification.timeout = true
    notification.value = (
      <div>
        <p>Are you sure you want to delete { name }</p>
        <br />
        <button style={ this.style.deleteButton }
                onClick={ (ev) => this.deleteProject(ev, name) }>Yes</button>
        <button style={ this.style.deleteButton }
                onClick={ this.modalClose.bind(this) }>No</button>
      </div>
    )
    this.setState({ notification })

  }

  modalClose(e) {
    let notification = {...this.state.notification};
    notification.show = false
    this.setState({ notification })
  }

  render() {
    let list = []
    for(let key in this.state.filteredList) {
      list.push((
        <div className="list-item"
             key={ list.length }
             style={ this.style.listItem } >
          <Link to={ "/app/edit/" + key + "/default/" }
                style={ this.style.listItem.a } >
            <span>{ key }</span>
          </Link>
          <div className="actions" style={ this.style.listItem.actions }>
            <button onClick={ (e) => this.promptDeleteProject(e, key) }
                    style={ this.style.button }
                    key={ "RADIUM_BUTTON" + list.length }>
              <i className="material-icons" style={ this.style.icon }>delete_forever</i>
            </button>
          </div>
        </div>
      ))
    }

    let notification
    if(this.state.notification) {
      notification = (
        <Notification style={ this.style[this.state.notification.name] }
                      onClose={ this.modalClose.bind(this) }
                      timedHide={ this.state.notification.timeout }
                      show={ this.state.notification.show }>
          { this.state.notification.value }
        </Notification>
      )
    }

    return (
      <div className={"note-list " + this.props.className}
           style={{...this.props.style, ...this.style.noteList}}>
        { notification }
        <header style={ this.style.header }>
          <h1 style={{ fontWeight: "300" }}>Projects</h1>
        </header>
        <div className="note-list" style={ this.style.noteList }>
          <SearchBar onChange={ this.filterList.bind(this) }
                     theme={ this.state.theme }
                     style={{ ...this.style.searchBar }} />
          {(list.length > 0 && list) || (
            <EmoteError style={ this.style.placeholder }>
              <p style={this.style.placeholder}>no projects found</p>
              <br />
              <Link to="/app/edit/new/default">
                <p style={{ ...this.style.placeholder,
                            ...this.style.placeholderLink }}>
                  why not create one?
                </p>
              </Link>
            </EmoteError>
          )}
        </div>
      </div>
    );
  }
}


export default Radium(ProjectList);
