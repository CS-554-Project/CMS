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
      entry: undefined,
      structure: undefined,
      loading: false
    };
  }

  async getStructure(reqSlug) {
    try {
      this.setState({ loading: true });
     //console.log("/user/entries?slug=" + reqSlug);
      let response = await axiosInstance.get("/user/entries",{
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


  async getEntry(reqSlug) {
    try {
      this.setState({ loading: true });
      //console.log("/user/entries?slug=" + reqSlug);
      let response = await axiosInstance.get("/user/entry", {
        params: {
          slug: reqSlug
        }
      });
      console.log(response.data);
      const entryData = response.data;
      this.setState({
        loading: false,
        entry: entryData
      });
    } catch (e) {
      this.setState({ loading: false });
    }
  }

  async componentDidMount() {
    let entrySlug = this.props.match.params.entry;
    let structureSlug = this.props.match.params.structure;
    await this.getEntry(entrySlug);
    await this.getStructure(structureSlug);
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
    let body = null;
    if (this.state.loading) {
      body = <div className="row">Loading...</div>;
    } else if (this.state.structure && this.state.entry) {
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
                <h2>{this.state.entry.title}</h2>
              </div>
              <div className="row">
                <p>{this.state.entry.blurb}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return body;
  }
}
export default SingleEntry;
