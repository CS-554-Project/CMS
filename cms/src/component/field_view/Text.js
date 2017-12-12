/******************************************
 *  Author : Harsh Jagdishbhai Kevadia
 *  Created On : Fri Dec 08 2017
 *  File : Text.js
 *******************************************/
import React, { Component } from "react";

class Text extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log("Insight");
    return (
      <div className="row">
        <div className="col-md-2">{this.props.data.label}</div>
        <div className="col-md-10">
          <p>{this.props.data.value}</p>
        </div>
      </div>
    );
  }
}

export default Text;