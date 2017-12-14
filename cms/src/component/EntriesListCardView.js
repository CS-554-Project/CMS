/******************************************
 *  Author : Harsh Jagdishbhai Kevadia
 *  Created On : Fri Dec 01 2017
 *  File : EntriesListCardView.js
 *******************************************/
import React, { Component } from "react";
import { Link } from "react-router-dom";

class EntriesListCardView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let body = null;
    if (this.props.structure.entries.length !== 0) {
      const structureSlug = this.props.structure.slug;
      const entryCardView = this.props.structure.entries.map(entry => {
        return (
          <div className="col-md-4 custom-card">
            <div className="card">
              <div className="card-block custom-card">
                <h3 className="card-title">{entry.title}</h3>
                <p className="card-text">{entry.blurb}</p>
                <Link to={"/Structure/" + structureSlug + "/" + entry.slug}>
                  <button className="btn btn-primary">{entry.title}</button>
                </Link>
              </div>
            </div>
          </div>
        );
      });
      body = <div className="row">{entryCardView}</div>;
    } else {
      body = <div className="row">There is no entries define</div>;
    }
    return body;
  }
}
export default EntriesListCardView;
