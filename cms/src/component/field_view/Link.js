/******************************************
 *  Author : Harsh Jagdishbhai Kevadia
 *  Created On : Fri Dec 08 2017
 *  File : Link.js
 *******************************************/
import React, { Component } from "react";

class Link extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-2">
          <h5>{this.props.data.label}: </h5>
        </div>
        <div className="col-md-10">
          <div className="row">
            <div className="col-md-3">
              <h6>{this.props.data.value.title}</h6>
            </div>
            <div className="col-md-8">
              <a href={this.props.data.value.url} target="_blank">
                {this.props.data.value.title} Link
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Link;
