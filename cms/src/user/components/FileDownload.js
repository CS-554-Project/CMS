import React, { Component } from "react";

class FileDownload extends Component {
  render() {
    const server_url = "http://localhost:3001/files";
    let name = this.props.data.value.substr(
      0,
      this.props.data.value.lastIndexOf(".")
    );
    return (
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">
          {this.props.data.label}
        </label>
        <div className="col-sm-10">
          <a href={`${server_url}/${this.props.data.value}`} download>
            {name}
          </a>
        </div>
      </div>
    );
  }
}

export default FileDownload;
