/******************************************
 *  Author : Harsh Jagdishbhai Kevadia
 *  Created On : Thu Dec 14 2017
 *  File : index.js
 *******************************************/
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
import UserWelcome from "./UserWelcome";
import queryString from "query-string";
import Search from "./Search";

class HomePage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { match } = this.props;
    const { url } = match;
    let query = queryString.parse(this.props.location.search);
    let body = null;
    if (query.search) {
      body = <Search search={query.search} />;
    } else {
      body = <UserWelcome />;
    }
    return body;
  }
}

export default HomePage;
