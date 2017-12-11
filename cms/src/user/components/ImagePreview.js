import React, { Component } from "react";
import Dropzone from 'react-dropzone';

class ImagePreview extends Component {
  render() {
    return (
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">{this.props.data.label}</label>
          <div className="col-sm-10">
            <img src={`http://localhost:3001/images/${this.props.data.value}`}/>
          </div>
        </div>
    );
  }
}

export default ImagePreview;
