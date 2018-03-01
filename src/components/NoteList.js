import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

const style = {

}

export default class NoteList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      filteredList: []
    }
  }


  render() {
    let list = this.state.list.map((item, i) => (
      <div className="list-item"></div>
    ))
    return (
      <div className={"note-list " + this.props.className}
           style={{...this.props.style, ...style}}>


      </div>
    );
  }
}
