/******************************************
 *  Author : Harsh Jagdishbhai Kevadia
 *  Created On : Thu Nov 30 2017
 *  File : UserWelcome.js
 *******************************************/
import React, { Component } from "react";
import { Link } from "react-router-dom";
import StructuresListLeftNav from "../../Component/StructuresListLeftNav";

class UserWelcome extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let body = (
      <div className="row">
        <div class="span6">
          <div class="mycontent-left">
            <StructuresListLeftNav />
          </div>
        </div>
        <div class="span6">
          <div class="mycontent-right">
          </div>
        </div>
      </div>
    );
    return body;
  }
}
export default UserWelcome;
