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
        <div className="col-md-2">{this.props.data.label}: </div>
        <div className="col-md-10">
          <a href={this.props.data.value} target="_blank"> {this.props.data.label} Link </a>
        </div>
      </div>
    );
  }
}

export default Text;