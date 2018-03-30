import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';

import api from "../assets/js/api.js"
import { themes } from "../assets/js/theme.js"

import SearchBar from "./SearchBar.js"
import EmoteError from "./EmoteError.js"
import Notification from "./Notification.js"

const theme = api.getSetting("theme")

const style = StyleSheet.create({
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
  },
  li: {
    flex: "3",
  },
  a: {
    color: themes[theme].color,
    padding: "8px",
    opacity: "0.8",
    display: "block",
    transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
    ":hover": {
      opacity: "1"
    }
  },
  actions: {
    flex: "1",
    padding: "0 16px",
    borderLeft: "1px solid " + themes[theme].accent,
    display: "flex",
    justifyContent: "space-around",
  },
  button: {
    background: "transparent",
    color: themes[theme].color,
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
    color: themes[theme].color,
    padding: "16px 32px",
    marginBottom: "16px",
    fontSize: "32px",
  },
  placeholder: {
    textAlign: "center",
    opacity: "0.4",
    color: themes[theme].color,
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
    borderBottom: "1px solid " + themes[theme].color,
    marginBottom: "32px",

  },
  warning: {
    backgroundColor: themes[theme].error,
    color: themes[theme].color,
  },
  deleteButton: {
    border: "1px solid " + themes[theme].color,
    color: themes[theme].color,
    padding: "4px",
    background: "transparent",
    cursor: "pointer",
    marginRight: "16px",
    textAlign: "center",
  }
})

export default class ProjectList extends Component {
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
        <button className={ css(style.deleteButton) }
                onClick={ (ev) => this.deleteProject(ev, name) }>Yes</button>
        <button className={ css(style.deleteButton) }
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
    let list = [];
    for(let key in this.state.filteredList) {
      list.push((
        <div key={ list.length }
             className={ css(style.listItem) + " list-item" } >
             <span className={ css(style.li)}>
               <Link to={ "/app/edit/" + key + "/default/" } >
                 <span className={ css(style.a) }>{ key }</span>
               </Link>
             </span>
          <div className={"actions " + css(style.actions) }>
            <button onClick={ (e) => this.promptDeleteProject(e, key) }
                    className={ css(style.button) }
                    key={ list.length }>
              <i className={"material-icons " + css(style.icon) }>delete_forever</i>
            </button>
          </div>
        </div>
      ))
    }

    let notification
    notification = (
      <Notification style={ style[this.state.notification.name] }
                    onClose={ this.modalClose.bind(this) }
                    timedHide={ this.state.notification.timeout }
                    show={ this.state.notification.show }>
        { this.state.notification.value }
      </Notification>
    )

    return (
      <div className={css(style.noteList) + " note-list " + this.props.className}
           style={{...this.props.style}}>
        { notification }
        <header className={ css(style.header) }>
          <h1 style={{ fontWeight: "300" }}>Projects</h1>
        </header>
        <div className={"note-list" + css(style.noteList) }>
          <SearchBar onChange={ this.filterList.bind(this) }
                     theme={ this.state.theme }
                     style={{ ...style.searchBar }} />
          {(list.length > 0 && list) || (
            <EmoteError className={ css(style.placeholder) }>
              <p className={ css(style.placeholder) }>no projects found</p>
              <br />
              <Link to="/app/edit/new/default">
                <p className={ css(style.placeholder, style.placeholderLink) }>
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
