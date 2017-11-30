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
    var structures = [
      {name:'Structure one',slug:'One'},
      {name:'Structure Two',slug:'Two'}
    ]; 
    
    let body = (
      <div className="row">
        <div class="span6">
          <div class="mycontent-left">
            <StructuresListLeftNav structures={structures}/>
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
