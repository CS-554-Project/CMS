/******************************************
 *  Author : Harsh Jagdishbhai Kevadia
 *  Created On : Thu Dec 14 2017
 *  File : Search.js
 *******************************************/
import React, { Component } from "react";
import { Link } from "react-router-dom";
import StructuresListLeftNav from "../../component/StructuresListLeftNav";
import SearchEntriesCardView from "../../component/SearchEntriesCardView";
import axiosInstance from "../../utils/AxiosInstance";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      structures: [],
      structuresLoading: false,
      searchResult: [],
      searchResultLoading: false
    };
  }

  async getStructures() {
    try {
      this.setState({ structuresLoading: true });
      let response = await axiosInstance.get("/user/structures");
      this.setState({
        structures: response.data,
        structuresLoading: false
      });
    } catch (e) {
      this.setState({ structuresLoading: false });
    }
  }

  async search(query) {
    try {
      this.setState({ searchResultLoading: true });
      let response = await axiosInstance.get("/user/search", {
        params: {
          search: query
        }
      });
      this.setState({
        searchResult: response.data,
        searchResultLoading: false
      });
      //console.log(this.state.searchResult);
    } catch (e) {
      this.setState({ searchResultLoading: false });
    }
  }

  async componentDidMount() {
    let searchQuery = this.props.search;
    await this.getStructures();
    await this.search(searchQuery);
  }

  render() {
    let body = null;
    if (this.state.structuresLoading || this.state.searchResultLoading) {
      body = <div className="row">Loading...</div>;
    } else {
      body = (
        <div className="row">
          <div className="col-md-2">
            <div className="mycontent-left">
              <StructuresListLeftNav structures={this.state.structures} />
            </div>
          </div>
          <div className="col-md-10">
            <div className="mycontent-right">
              <h2>Total Search Result Found: {this.props.search}</h2>
              <p>Search result for: {this.props.search}</p>
              <hr />
              <SearchEntriesCardView results={this.state.searchResult} />
            </div>
          </div>
        </div>
      );
    }
    return body;
  }
}
export default Search;
