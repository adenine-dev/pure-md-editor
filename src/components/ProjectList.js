import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import api from "../assets/js/api.js"
import themes from "../assets/js/theme.js"

import SearchBar from "./SearchBar.js"


export default class ProjectList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: api.getProjects(),
      filteredList: api.getProjects(),
      theme: api.getSetting("theme")
    }
    this.style = {
      noteList: {

      },
      listItem: {
        color: themes[this.state.theme].color,
        margin: "8px auto",
        width: "90%",
        maxWidth: "960px",
        padding: "8px 16px",
        backgroundColor: themes[this.state.theme].bgAlt,
        borderLeft: themes[this.state.theme].accent + " 8px solid",

      },
      header: {
        width: "100%",
        color: themes[this.state.theme].color,
        padding: "16px 32px",
        marginBottom: "16px",
        fontSize: "32px",
      }
    }
  }

  filterList(e) {

  }

  render() {
    let list = []
    for(let key in this.state.filteredList) {
      list.push((
        <div className="list-item" key={ list.length } >
          <Link to={ "/app/edit/" + key + "/default/" }>
            <p style={ this.style.listItem }>
              { key }
            </p>
          </Link>
        </div>
      ))
    }

    return (
      <div className={"note-list " + this.props.className}
           style={{...this.props.style, ...this.style.noteList}}>
       <header style={ this.style.header }>
         <h1 style={{ fontWeight: "300" }}>Projects</h1>
       </header>
        <SearchBar onChange={ this.filterList.bind(this) }
                   theme={ this.state.theme } />
        {(list.length > 0 && list) || (
          <div>
            <p>you have no projects <br/>
              <Link to="/app/edit/new/default/">Why not create one?</Link>
            </p>
          </div>
        )}
      </div>
    );
  }
}
