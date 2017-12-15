/******************************************
 *  Author : Harsh Jagdishbhai Kevadia
 *  Created On : Fri Dec 01 2017
 *  File : SingleEntry.js
 *******************************************/
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import EntriesListLeftNav from "../../component/EntriesListLeftNav";
import axiosInstance from "../../utils/AxiosInstance";
import DynamicComponentLoading from "../../component/DynamicComponentLoading";

class SingleEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: undefined,
      structure: undefined,
      structureLoading: false,
      entryLoading: false,
      comment: ""
    };

    this._showComment = this._showComment.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._validateFields = this._validateFields.bind(this);
    this._addComment = this._addComment.bind(this);
    this._addCommentBox = this._addCommentBox.bind(this);
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
        structureLoading: false,
        structure: structureData
      });
    } catch (e) {
      this.setState({ structureLoading: false });
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
      //console.log(response.data);
      const entryData = response.data;
      this.setState({
        entryLoading: false,
        entry: entryData
      });
    } catch (e) {
      this.setState({ entryLoading: false });
    }
  }

  async componentDidMount() {
    let entrySlug = this.props.match.params.entry;
    let structureSlug = this.props.match.params.structure;
    await this.getEntry(entrySlug);
    await this.getStructure(structureSlug);
  }

  _handleChange(e) {
    e.preventDefault();
    let target = e.target;
    let value = target.value;
    let name = target.id;
    this.setState({
      [name]: value
    });
  }

  _validateFields() {
    if (this.state.comment === "" || this.state.comment === undefined) {
      toast.warn("Comment Text Required", {
        position: toast.POSITION.TOP_CENTER
      });
      return false;
    }
    return true;
  }

  async _addComment() {
    console.log("inside");
    if (!this._validateFields()) return;
    let payload = {
      slug: this.state.entry.slug,
      comment: this.state.comment
    };
    let response = await axiosInstance.post("/user/addcomment", payload);
    this.setState({
      comment: ""
    });
    this.getEntry(this.props.match.params.entry);
  }

  _showComment() {
    if (localStorage.jwtToken != null) {
      return (
        <div>
          <label for="comment"></label>
          <input
            type="text"
            id="comment"
            className="form-control"
            placeholder="Add Comment"
            value={this.state.comment}
            onChange={this._handleChange}
          />
          <br />
          <button
            className="btn btn-success"
            onClick={() => {
              this._addComment();
            }}
          >
            Add
          </button>
        </div>
      );
    }
  }

  _addCommentBox() {
    if (localStorage.jwtToken != null) {
      if (this.state.entry.comments.length > 0) {
        return (
          <table>
            <tbody>
              {this.state.entry.comments.map((comment, index) => {
                <tr key={index}>
                  <td>{comment.comments}</td>
                </tr>;
              })}
            </tbody>
          </table>
        );
      }
    }
  }

  render() {
    ////////////////////////////////////////////////////////////////////////////////////////////
    //////                             Testing - Object                                   //////
    ////////////////////////////////////////////////////////////////////////////////////////////

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

    // let structure = {
    //   _id: "f4f5c858-e311-4e47-8897-0452a49326bd",
    //   name: "Struct1",
    //   slug: "st1",
    //   description: "Structure 1",
    //   pagesize: 10,
    //   entries: [
    //     {
    //       _id: "a318a70f-8d0f-40fc-9fae-235a7d446e8b",
    //       title: "Struct1: Entry1",
    //       slug: "st1entry1",
    //       blurb: "Structure 1 In Entry 1",
    //       author: "Test1",
    //       fields: [
    //         {
    //           label: "Text Area",
    //           type: "text-area",
    //           value: "Hii..!"
    //         },
    //         {
    //           label: "Link",
    //           type: "link",
    //           value: "www.link.com"
    //         }
    //       ],
    //       comments: []
    //     },
    //     {
    //       _id: "3b113043-5ac0-4aed-ab41-63176d6e8b18",
    //       title: "Struct1: Entry1",
    //       slug: "st1entry1",
    //       blurb: "Structure 1 In Entry 1",
    //       author: "Test1",
    //       fields: [
    //         {
    //           label: "Name",
    //           type: "small-text-input",
    //           value: "Product 1"
    //         },
    //         {
    //           label: "Number",
    //           type: "number-input",
    //           value: "10"
    //         }
    //       ],
    //       comments: []
    //     }
    //   ],
    //   fields: [
    //     {
    //       label: "Name",
    //       type: "small-text-input"
    //     },
    //     {
    //       label: "Number",
    //       type: "number-input"
    //     },
    //     {
    //       label: "CheckBox",
    //       type: "checkbox"
    //     }
    //   ]
    // };
    // let entry = {
    //   _id: "3b113043-5ac0-4aed-ab41-63176d6e8b18",
    //   title: "Struct1: Entry1",
    //   slug: "st1entry1",
    //   blurb: "Structure 1 In Entry 1",
    //   author: "Test1",
    //   fields: [
    //     {
    //       label: "Name",
    //       type: "small-text-input",
    //       value: "Product 1"
    //     },
    //     {
    //       label: "Number",
    //       type: "number-input",
    //       value: "10"
    //     }
    //   ],
    //   comments: []
    // };

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
    //     {
    //       label: "Struct in Struct",
    //       type: "reference-entry",
    //       value: "e7d8fd9c-e6c4-4b4e-be3f-8df3e7c5e4ee"
    //     },
    //     { label: "Download File", type: "file-uploader", value: "Resume.zip" }
    //   ],
    //   comments: []
    // });
    // let testingObject = JSON.parse(realJSON);

    ////////////////////////////////////////////////////////////////////////////////////////////
    //////                     Testing - Object -End                                      //////
    ////////////////////////////////////////////////////////////////////////////////////////////
    let body = null;

    if (this.state.entryLoading && this.state.structureLoading) {
      body = <div className="row">Loading...</div>;
    } else if (this.state.structure && this.state.entry) {
      let comment = null;
      if (localStorage.jwtToken != null) {
        if (this.state.entry.comments.length !== 0) {
          comment = this.state.entry.comments.map((commentData, index) => {
            return (
              // <div className="row" key={index}>
              <div className="col-md-12">{commentData.comments}</div>
              // </div>
            );
          });
        }
      }
      body = (
        <div className="row">
          <ToastContainer autoClose={1000} />
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
              <DynamicComponentLoading fields={this.state.entry.fields} />
              {/* <DynamicComponentLoading fields={testingObject.fields} /> */}
              <div className="row">
                <h5>Comments: </h5>
              </div>
              <div className="row">
                <div className="col-md-12">{comment}</div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-12">{this._showComment()}</div>
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
