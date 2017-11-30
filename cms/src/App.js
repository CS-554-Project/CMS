import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
//import logo from './logo.svg';
import "./App.css";
import User from "./User";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          {/* <Route path="/404" component={Error404} /> */}
          <Route path="/" component={User} />
        </Switch>
      </Router>
    );
  }
}

export default App;
