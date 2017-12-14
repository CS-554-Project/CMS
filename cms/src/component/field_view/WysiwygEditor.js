/******************************************
 *  Author : Harsh Jagdishbhai Kevadia
 *  Created On : Wed Dec 13 2017
 *  File : WysiwygEditor.js
 *******************************************/
import React, { Component } from "react";

class WysiwygEditor extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-2">
          <h5>{this.props.data.label}</h5>
        </div>
        <div className="col-md-10">
          <p dangerouslySetInnerHTML={{ __html: this.props.data.value }} />
        </div>
      </div>
    );
  }
}

export default WysiwygEditor;
