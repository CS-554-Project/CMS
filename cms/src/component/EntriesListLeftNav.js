/******************************************
 *  Author : Harsh Jagdishbhai Kevadia   
 *  Created On : Fri Dec 01 2017
 *  File : EntriesListLeftNav.js
 *******************************************/
import React, { Component } from "react";
import { Link } from "react-router-dom";

class EntriesListLeftNav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let body = null;
    if (this.props.structure.entries.length !== 0) {
      let structureSlug = this.props.structure.slug;
      const entriesNavigation = this.props.structure.entries.map(entry => {
        return (
          <li className="nav-item">
            <Link to={"/Structure/" + structureSlug + "/" + entry.slug}>{entry.title}</Link>
          </li>
        );
      });
      body = (
        <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse">
          <ul className="navbar-nav mr-auto">{entriesNavigation}</ul>
        </nav>
      );
    } else {
      body = (
        <div>
          There is no structure define
        </div>
      );
    }
    return body;
  }
}
export default EntriesListLeftNav;