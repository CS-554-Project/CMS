import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
import "./App.css";
import User from "./user";
import Admin from "./admin";
import Login from "./login/login";
import SignUp from "./login/signup";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route
            path="/admin"
            render={props =>
              localStorage.admin === "true" ? (
                <Admin {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/" component={User} />
        </Switch>
      </Router>
    );
  }
}

export default App;
