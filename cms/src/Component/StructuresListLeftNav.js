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
    let body = (
      <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a>Home</a>
          </li>
          <li className="nav-item">
            <a>Settings</a>
          </li>
          <li className="nav-item">
            <a>Profile</a>
          </li>
          <li className="nav-item">
            <a>Help</a>
          </li>
        </ul>
      </nav>
    );
    return body;
  }
}
export default StructuresListLeftNav;
