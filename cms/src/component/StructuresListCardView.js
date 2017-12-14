/******************************************
 *  Author : Harsh Jagdishbhai Kevadia
 *  Created On : Thu Nov 30 2017
 *  File : StructuresListCardView.js
 *******************************************/
import React, { Component } from "react";
import { Link } from "react-router-dom";

class StructuresListCardView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let body = null;
    if (this.props.structures.length !== 0) {
      const structureCardView = this.props.structures.map(structure => {
        return (
          <div className="col-md-4 custom-card">
            <div className="card">
              <div className="card-block custom-card">
                <h3 className="card-title">{structure.name}</h3>
                <p className="card-text">{structure.description}</p>
                <Link to={"/" + structure.slug}>
                  <button className="btn btn-primary">{structure.name}</button>
                </Link>
              </div>
            </div>
          </div>
        );
      });
      body = <div className="row">{structureCardView}</div>;
    } else {
      body = <div className="row">There is no structure define</div>;
    }
    return body;
  }
}
export default StructuresListCardView;
