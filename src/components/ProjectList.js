import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import api from "../assets/js/api.js"

import SearchBar from "./SearchBar.js"


const style = {

}

export default class ProjectList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: api.getProjects(),
      filteredList: api.getProjects()
    }
  }

  filterList(e) {

  }

  render() {
    let list = []
    for(let key in this.state.filteredList) {
      list.push((
        <div className="list-item" key={ list.length }>
          <p>{ key }</p>
        </div>
      ))
    }

    return (
      <div className={"note-list " + this.props.className}
           style={{...this.props.style, ...style}}>
        <SearchBar onChange={ this.filterList.bind(this) }/>
        {(list.length > 0 && list) || (
          <div>
            <p>you have no projects <br/>
              <Link to="/app/projects/new/default">Why not create one?</Link>
            </p>
          </div>
        )}
      </div>
    );
  }
}