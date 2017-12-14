/******************************************
 *  Author : Harsh Jagdishbhai Kevadia
 *  Created On : Thu Nov 30 2017
 *  File : UserWelcome.js
 *******************************************/
import React, { Component } from "react";
import { Link } from "react-router-dom";
import StructuresListLeftNav from "../../component/StructuresListLeftNav";
import StructuresListCardView from "../../component/StructuresListCardView";
import axiosInstance from '../../utils/AxiosInstance';

class UserWelcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      structures: []
    };
    this.getStructures = this.getStructures.bind(this);
  }

  componentWillMount() {
    this.getStructures();
  }

  async getStructures() {
    let response = await axiosInstance.get("/user/structures");
    console.log(response);
    this.setState({
      structures: response.data
    });
  }

  render() {
    // let structures = [
    //   {
    //     name: "Structure one",
    //     slug: "One",
    //     blurb: "This is structure one blurb"
    //   },
    //   {
    //     name: "Structure Two",
    //     slug: "Two",
    //     blurb: "This is structure two blurb"
    //   },
    //   {
    //     name: "Structure Two",
    //     slug: "Two",
    //     blurb: "This is structure two blurb"
    //   },
    //   {
    //     name: "Structure Two",
    //     slug: "Two",
    //     blurb: "This is structure two blurb"
    //   },
    //   {
    //     name: "Structure Two",
    //     slug: "Two",
    //     blurb: "This is structure two blurb"
    //   }
    // ];

    //structures = [];
    let body = (
      <div className="row">
        <div className="col-md-2">
          <div className="mycontent-left">
            <StructuresListLeftNav structures={this.state.structures} />
          </div>
        </div>
        <div className="col-md-10">
          <div className="mycontent-right">
            <h2>Total Structures: {this.state.structures.length}</h2>
            <hr />
            <StructuresListCardView structures={this.state.structures} />
          </div>
        </div>
      </div>
    );
    return body;
  }
}
export default UserWelcome;
