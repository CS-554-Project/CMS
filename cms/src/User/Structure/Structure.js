/******************************************
 *  Author : Harsh Jagdishbhai Kevadia   
 *  Created On : Thu Nov 30 2017
 *  File : Structure.js
 *******************************************/
import React, { Component } from "react";
import { Link } from "react-router-dom";
import StructuresListLeftNav from "../../Component/StructuresListLeftNav";
import StructuresListCardView from "../../Component/StructuresListCardView";

class Structure extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let structures = [
      { name: "Structure one", slug: "One", blurb: "This is structure one blurb" },
      { name: "Structure Two", slug: "Two" , blurb: "This is structure two blurb"},
      { name: "Structure Two", slug: "Two" , blurb: "This is structure two blurb"},
      { name: "Structure Two", slug: "Two" , blurb: "This is structure two blurb"},
      { name: "Structure Two", slug: "Two" , blurb: "This is structure two blurb"}
    ];

    //structures = [];
    let body = (
      <div className="row">
        <div className="col-md-2">
          <div className="mycontent-left">
            <StructuresListLeftNav structures={structures} />
          </div>
        </div>
        <div className="col-md-10">
          <div className="mycontent-right">
            <StructuresListCardView structures={structures} />
          </div>
        </div>
      </div>
    );
    return body;
  }
}
export default Structure;
