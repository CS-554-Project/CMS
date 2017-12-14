/******************************************
 *  Author : Harsh Jagdishbhai Kevadia
 *  Created On : Wed Dec 13 2017
 *  File : Download.js
 *******************************************/
import React, { Component } from "react";
import { API_ROOT } from "../../utils/AxiosInstance";

class Download extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let imageSrc = API_ROOT + "/files/";
    return (
      <div className="row">
        <div className="col-md-2">
          <h5>{this.props.data.label} </h5>
        </div>
        <div className="col-md-10">
          <a href={imageSrc + this.props.data.value} Download>
            {this.props.data.value}
          </a>
        </div>
      </div>
    );
  }
}

export default Download;
