import React, { Component } from "react";
import Dropzone from "react-dropzone";

class FileUpload extends Component {
  render() {
    return (
      <div className="form-group row">
        <label className="col-sm-2 col-form-label" for={this.props.data.label}>
          {this.props.data.label}
        </label>
        <div className="col-sm-10">
          <input
            type="file"
            id={this.props.data.label}
            className="form-control"
            onChange={this.props.handleInputChange}
          />
        </div>
      </div>
    );
  }
}

export default FileUpload;
