/******************************************
 *  Author : Harsh Jagdishbhai Kevadia
 *  Created On : Fri Dec 08 2017
 *  File : Text.js
 *******************************************/
import React, { Component } from "react";

class Text extends Component {
  render() {
    console.log("Harsh");
    return <div className="row">
        <div className="col-md-2">
          <h5>{this.props.data.label}</h5>
        </div>
        <div className="col-md-10">
          <p>{this.props.data.value}</p>
        </div>
      </div>;
  }
}

export default Text;