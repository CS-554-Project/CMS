/******************************************
 *  Author : Harsh Jagdishbhai Kevadia
 *  Created On : Thu Nov 30 2017
 *  File : StructuresListLeftNav.js
 *******************************************/
import React, { Component } from "react";
import { Link } from "react-router-dom";

class StructuresListLeftNav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let body = null;
    if (this.props.structures.length !== 0) {
      const structureNavigation = this.props.structures.map(structure => {
        return (
          <li className="nav-item">
            <Link to={"/Structure/" + structure.slug}>{structure.name}</Link>
          </li>
        );
      });
      body = (
        <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse">
          <ul className="navbar-nav mr-auto">{structureNavigation}</ul>
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
export default StructuresListLeftNav;
