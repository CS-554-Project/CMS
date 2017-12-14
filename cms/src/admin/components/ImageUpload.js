import React, { Component } from "react";

class ImageUpload extends Component {
  render() {
    if(this.props.data.value) {
        return (
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">{this.props.data.label}</label>
            <div className="col-sm-10">
              <button className="btn btn-success" onClick={() => this.props.resizeImage(this.props.data.value)} >Resize Image</button>
              <br/>
              <br/>
              <input type="file" id={this.props.data.label} className="form-control" onChange={this.props.handleInputChange} />
            </div>
          </div>
      );
    } else {
      return (
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">
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
}

export default ImageUpload;
