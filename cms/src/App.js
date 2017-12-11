import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
//import logo from './logo.svg';
import "./App.css";
import User from "./user";
import Admin from "./admin";
import Login from './login/Login';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          {/* <Route path="/404" component={Error404} /> */}
          <Route path="/admin" component={Admin} />
          <Route path="/login" component={Login} />
          <Route path="/" component={User} />
        </Switch>
      </Router>
    );
  }
}

export default App;
