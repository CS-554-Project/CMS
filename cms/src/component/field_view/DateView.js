/******************************************
 *  Author : Harsh Jagdishbhai Kevadia
 *  Created On : Wed Dec 13 2017
 *  File : DateView.js
 *******************************************/
import React, { Component } from "react";
import moment from "moment";

class DateView extends Component {
  render() {
    let date = new Date(this.props.data.value);
    let displayDate = moment(date).format("MMM D, YYYY");
    return (
      <div className="row">
        <div className="col-md-2">
          <h5>{this.props.data.label}</h5>
        </div>
        <div className="col-md-10">
          <p>{displayDate}</p>
        </div>
      </div>
    );
  }
}

export default DateView;
