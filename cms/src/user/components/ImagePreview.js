import React, { Component } from "react";

class ImagePreview extends Component {
  render() {
    const server_url = "http://localhost:3001/images";
    return (
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">{this.props.data.label}</label>
          <div className="col-sm-10">
            <img src={`${server_url}/${this.props.data.value}`} style={style}/>
          </div>
        </div>
    );
  }
}

const style = {
  height: '360px',
  width: '480px'
}

export default ImagePreview;
