
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import login from "./login";
import signup from "./signup";

class User extends Component {
  render() {
    const { match } = this.props;
    const { url } = match;

    return (
      <Switch>
        <Route path="/login" component={login} />
        <Route path="/signup" component={signup} />
      </Switch>
    );
  }
}

export default User;
