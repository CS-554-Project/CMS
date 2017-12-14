import { start } from "repl";

/******************************************
 *  Author : Harsh Jagdishbhai Kevadia
 *  Created On : Wed Dec 13 2017
 *  File : ReferenceEntry.js
 *******************************************/
import React, { Component } from "react";
import DynamicComponentLoading from "./../DynamicComponentLoading";
import axiosInstance from "../../utils/AxiosInstance";

class ReferenceEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refEntry: undefined,
      refEntryLoading: false
    };
  }

  async getEntry(reqID) {
    try {
      this.setState({ refEntryLoading: true });
      let response = await axiosInstance.get("/user/entry", {
        params: {
          id: reqID
        }
      });
      const entryData = response.data;
      this.setState({
        refEntryLoading: false,
        refEntry: entryData
      });
    } catch (e) {
      this.setState({ refEntryLoading: false });
    }
  }

  async componentDidMount() {
    let entryID = this.props.data.value;
    await this.getEntry(entryID);
  }

  render() {
    let body = null;
    if (this.state.refEntryLoading) {
      body = <div className="row">Loading...</div>;
    } else if (this.state.refEntry) {
      body = <DynamicComponentLoading fields={this.state.refEntry.fields} />;
    }
    return body;
  }
}

export default ReferenceEntry;
