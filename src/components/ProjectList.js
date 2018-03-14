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
      filteredList: api.getProjects(),
      theme: this.props.theme || "dark"
    }
  }

  filterList(e) {

  }

  render() {
    console.log(this.state.list);
    let list = []
    for(let key in this.state.filteredList) {
      list.push((
        <div className="list-item" key={ list.length }>
          <Link to={ "/app/edit/" + key + "/default/" }><p>{ key }</p></Link>
        </div>
      ))
    }

    return (
      <div className={"note-list " + this.props.className}
           style={{...this.props.style, ...style}}>
        <SearchBar onChange={ this.filterList.bind(this) }
                   theme={ this.state.theme }/>
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
