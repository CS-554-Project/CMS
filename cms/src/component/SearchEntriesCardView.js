/******************************************
 *  Author : Harsh Jagdishbhai Kevadia
 *  Created On : Thu Dec 14 2017
 *  File : SearchEntriesCardView.js
 *******************************************/
import React, { Component } from "react";
import { Link } from "react-router-dom";

class SearchEntriesCardView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let body = null;
    if (this.props.results.length !== 0) {
      const entryCardView = this.props.results.map(result => {
        return (
          <div className="col-md-4 custom-card">
            <div className="card">
              <div className="card-block custom-card">
                <h3 className="card-title">{result._source._title}</h3>
                <p className="card-text">{result._source._blurb}</p>
                <Link
                  to={
                    "/" +
                    result._source._structureslug +
                    "/" +
                    result._source._slug
                  }
                >
                  <button className="btn btn-primary">
                    {result._source._title}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        );
      });
      body = <div className="row">{entryCardView}</div>;
    } else {
      body = <div className="row">There is no result found!</div>;
    }
    return body;
  }
}
export default SearchEntriesCardView;
