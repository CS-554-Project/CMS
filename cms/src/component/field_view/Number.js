/******************************************
 *  Author : Harsh Jagdishbhai Kevadia
 *  Created On : Fri Dec 08 2017
 *  File : Number.js
 *******************************************/
import React, { Component } from "react";

class Number extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-2">{this.props.data.label}</div>
        <div className="col-md-10">{this.props.data.value}</div>
      </div>
    );
  }
}

export default Number;
