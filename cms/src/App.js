import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
//import logo from './logo.svg';
//import './App.css';
//import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
//import "../node_modules/jquery/dist/";
//import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import jQuery from 'jquery';
import "bootstrap";


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header>
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
              <a className="navbar-brand" href="#">
                CMS
              </a>
            
              <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Home <span class="sr-only">(current)</span>
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </header>

          <div className="App-body">
            <p className="App-intro">
              To get started, edit <code>src/App.js</code> and save to reload.
            </p>
            <Switch>
              {/* <Route path="/404" component={Error404} />
            <Route path="/" component={} /> */}
            </Switch>
          </div>
          <footer>@Copyrights 2018</footer>
        </div>
      </Router>
    );
  }
}

export default App;
