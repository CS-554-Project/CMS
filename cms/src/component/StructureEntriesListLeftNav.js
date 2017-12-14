/******************************************
 *  Author : Harsh Jagdishbhai Kevadia
 *  Created On : Thu Nov 30 2017
 *  File : StructureEntriesListLefNav.js
 *******************************************/
import React, { Component } from "react";
import { Link } from "react-router-dom";

class StructureEntriesListLeftNav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let body = null;
    if (this.props.structureEntries.length !== 0) {
      let structureSlug = this.props.structure.slug;
      const structureEntriesNavigation = this.props.structureEntries.map(
        entry => {
          return (
            <li className="nav-item">
              <Link to={"/" + structureSlug + "/" + entry.slug}>
                {entry.name}
              </Link>
            </li>
          );
        }
      );
      body = (
        <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse">
          <ul className="navbar-nav mr-auto">{structureEntriesNavigation}</ul>
        </nav>
      );
    } else {
      body = (
        <div>
          There is no entry in structure!
        </div>
      );
    }
    return body;
  }
}
export default StructureEntriesListLeftNav;
