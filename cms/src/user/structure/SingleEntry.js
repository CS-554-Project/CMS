/******************************************
 *  Author : Harsh Jagdishbhai Kevadia
 *  Created On : Fri Dec 01 2017
 *  File : SingleEntry.js
 *******************************************/
import React, { Component } from "react";
import { Link } from "react-router-dom";
import EntriesListLeftNav from "../../component/EntriesListLeftNav";
import axiosInstance from "../../utils/AxiosInstance";

class SingleEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      structure: []
    };
    this.getStructureEntries = this.getStructureEntries.bind(this);
  }
  componentWillMount() {
    this.getStructureEntries(this.props.match.params.structure);
  }

  async getStructureEntries(slug) {
    let response = await axiosInstance.get("/user/entries?slug=" + slug);
    console.log(response);
    this.setState({
      structures: response.data
    });
  }

  render() {
    // let structure = {
    //   name: this.props.match.params.structure,
    //   blurb: "This is Structure Discription",
    //   structureSlug: this.props.match.params.structure,
    //   entries: [
    //     { name: "Entry one", slug: "One", blurb: "This is Entry one blurb" },
    //     { name: "Entry Two", slug: "Two", blurb: "This is Entry two blurb" },
    //     { name: "Entry Two", slug: "Two", blurb: "This is Entry two blurb" },
    //     { name: "Entry Two", slug: "Two", blurb: "This is Entry two blurb" },
    //     { name: "Entry Two", slug: "Two", blurb: "This is Entry two blurb" }
    //   ]
    // };

    // let entry = {
    //   name: this.props.match.params.entry,
    //   blurb: "Harsh Kevadia"
    // };

    let body = (
      <div className="row">
        <div className="col-md-2">
          <div className="mycontent-left">
            <EntriesListLeftNav structure={this.state.structure} />
          </div>
        </div>
        <div className="col-md-10">
          <div className="mycontent-right">
            <div className="row">
              <h2>{this.state.structure.name}</h2>
            </div>
            <div className="row">
              <p>{this.state.structure.blurb}</p>
            </div>
          </div>
        </div>
      </div>
    );
    return body;
  }
}
export default SingleEntry;
