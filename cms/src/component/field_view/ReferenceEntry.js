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
      if (response.data.fields) {
        this.setState({
          refEntryLoading: false,
          refEntry: response.data
        });
      }
    } catch (e) {
      this.setState({ refEntryLoading: false });
    }
  }

  async componentDidMount() {
    let entryID = this.props.data.value;
    await this.getEntry(entryID);
  }

  render() {
    // let realJSON = JSON.stringify({
    //   _id: "40e46f97-0a49-4187-91b4-6a675b26574c",
    //   title: "Test Entry 1",
    //   slug: "test-entry-1",
    //   blurb: "This is Entry 1 Description",
    //   author: "admin",
    //   created_date: "12-13-2017",
    //   fields: [
    //     { label: "Title", type: "small-text-input", value: "Dynamic Title" },
    //     {
    //       label: "Description",
    //       type: "text-area",
    //       value: "Dynamic Description"
    //     },
    //     {
    //       label: "External Link",
    //       type: "link",
    //       value: {
    //         title: "LinkedIn",
    //         url: "https://www.linkedin.com/in/kevadiaharsh/"
    //       }
    //     },
    //     {
    //       label: "Youtube Link",
    //       type: "embeddable-youtube",
    //       value: "3nMUwLXLxpw"
    //     },
    //     {
    //       label: "Created Date",
    //       type: "datepicker",
    //       value: "2017-12-17T01:44:31.000Z"
    //     },
    //     { label: "Price", type: "number-input", value: "50" },
    //     {
    //       label: "Product Images",
    //       type: "image-uploader",
    //       value: "Capture.PNG"
    //     },
    //     {
    //       label: "Run-time Description",
    //       type: "wysiwyg-editor",
    //       value:
    //         "<p>Hi This is <strong>Dynamic HTML Page, </strong>I am <em>Harsh Kevadia.</em></p>\n<p><code><em>How are you?</em></code></p>\n"
    //     },
    //     { label: "Download File", type: "file-uploader", value: "Resume.zip" }
    //   ],
    //   comments: []
    // });
    // let testingObject = JSON.parse(realJSON);
    let body = null;
    if (this.state.refEntryLoading) {
      //body = <div className="row">Loading...</div>;
    } else if (this.state.refEntry) {
      body = <DynamicComponentLoading fields={this.state.refEntry.fields} />;
      // body = <DynamicComponentLoading fields={testingObject.fields} />;
    }
    return body;
  }
}

export default ReferenceEntry;
