/******************************************
 *  Author : Harsh Jagdishbhai Kevadia
 *  Created On : Thu Nov 30 2017
 *  File : SingleStructure.js
 *******************************************/
import React, { Component } from "react";
import { Link } from "react-router-dom";
import EntriesListLeftNav from "../../component/EntriesListLeftNav";
import EntriesListCardView from "../../component/EntriesListCardView";
import axiosInstance from "../../utils/AxiosInstance";

class SingleStructure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      structure: undefined,
      loading: false
    };
  }

  async getStructure(reqSlug) {
    try {
      this.setState({ loading: true });
      //console.log("/user/entries?slug=" + reqSlug);
      let response = await axiosInstance.get("/user/entries", {
        params: {
          slug: reqSlug
        }
      });
      //console.log(response.data);
      const structureData = response.data;
      this.setState({
        loading: false,
        structure: structureData
      });
    } catch (e) {
      this.setState({ loading: false });
    }
  }

  async componentDidMount() {
    let structureSlug = this.props.match.params.structure;
    await this.getStructure(structureSlug);
  }

  render() {
    //console.log(this.state.structure);
    // let entries = [
    //   { name: "Entry one", slug: "One", blurb: "This is Entry one blurb" },
    //   { name: "Entry Two", slug: "Two", blurb: "This is Entry two blurb" },
    //   { name: "Entry Two", slug: "Two", blurb: "This is Entry two blurb" },
    //   { name: "Entry Two", slug: "Two", blurb: "This is Entry two blurb" },
    //   { name: "Entry Two", slug: "Two", blurb: "This is Entry two blurb" }
    // ];

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

    // let structure = {
    //   name: this.props.match.params.structure,
    //   blurb: "This is Structure Discription",
    //   structureSlug: this.props.match.params.structure,
    //   entries: []
    // };
    //structures = [];

    let body = null;
    if (this.state.loading) {
      body = <div className="row">Loading...</div>;
    } else if (this.state.structure) {
      body = (
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
                <p>{this.state.structure.description}</p>
              </div>
              <hr />
              <EntriesListCardView structure={this.state.structure} />
            </div>
          </div>
        </div>
      );
    }
    return body;
  }
}
export default SingleStructure;
