/******************************************
 *  Author : Harsh Jagdishbhai Kevadia
 *  Created On : Thu Nov 30 2017
 *  File : index.js
 *******************************************/
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import UserWelcome from "./userWelcome";
import Structure from "./structure";

class User extends Component {
  render() {
    const { match } = this.props;
    const { url } = match;

    return (
      <Switch>
        <Route path="/:structure/" component={Structure} />
        <Route path="/" component={UserWelcome} />
      </Switch>
    );
  }
}

export default User;
