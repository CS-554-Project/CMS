/******************************************
 *  Author : Harsh Jagdishbhai Kevadia
 *  Created On : Thu Nov 30 2017
 *  File : SingleStructure.js
 *******************************************/
import React, { Component } from "react";
import { Link } from "react-router-dom";
import EntriesListLeftNav from "../../component/EntriesListLeftNav";
import EntriesListCardView from "../../component/EntriesListCardView";

class SingleStructure extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let entries = [
      { name: "Entry one", slug: "One", blurb: "This is Entry one blurb" },
      { name: "Entry Two", slug: "Two", blurb: "This is Entry two blurb" },
      { name: "Entry Two", slug: "Two", blurb: "This is Entry two blurb" },
      { name: "Entry Two", slug: "Two", blurb: "This is Entry two blurb" },
      { name: "Entry Two", slug: "Two", blurb: "This is Entry two blurb" }
    ];

    let structure = {
      name: this.props.match.params.structure,
      blurb: "This is Structure Discription",
      structureSlug: this.props.match.params.structure,
      entries: [
        { name: "Entry one", slug: "One", blurb: "This is Entry one blurb" },
        { name: "Entry Two", slug: "Two", blurb: "This is Entry two blurb" },
        { name: "Entry Two", slug: "Two", blurb: "This is Entry two blurb" },
        { name: "Entry Two", slug: "Two", blurb: "This is Entry two blurb" },
        { name: "Entry Two", slug: "Two", blurb: "This is Entry two blurb" }
      ]
    };

    // let structure = {
    //   name: this.props.match.params.structure,
    //   blurb: "This is Structure Discription",
    //   structureSlug: this.props.match.params.structure,
    //   entries: []
    // };
    //structures = [];
    let body = (
      <div className="row">
        <div className="col-md-2">
          <div className="mycontent-left">
            <EntriesListLeftNav structure={structure} />
          </div>
        </div>
        <div className="col-md-10">
          <div className="mycontent-right">
            <div className="row">
              <h2>{structure.name}</h2>
            </div>
            <div className="row">
              <p>{structure.blurb}</p>
            </div>
            <hr />
            <EntriesListCardView structure={structure} />
          </div>
        </div>
      </div>
    );
    return body;
  }
}
export default SingleStructure;