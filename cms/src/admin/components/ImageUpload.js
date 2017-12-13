import React, { Component } from "react";
import { Image } from "react-bootstrap";
import { setTimeout } from "timers";

class ImageUpload extends Component {
  render() {
    const server_url = "http://localhost:3001/images";
    // if(this.props.data.value) {
    //     return (
    //       <div className="form-group row">
    //         <label className="col-sm-2 col-form-label">{this.props.data.label}</label>
    //         <div className="col-sm-10">
    //           <img src={`${server_url}/${this.props.data.value}`} style={style} />
    //           <br/>
    //           <input type="file" id={this.props.data.label} className="form-control" onChange={this.props.handleInputChange} />
    //         </div>
    //       </div>
    //     );
    // } else {
      return (
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">{this.props.data.label}</label>
          <div className="col-sm-10">
            <input type="file" id={this.props.data.label} className="form-control" onChange={this.props.handleInputChange} />
          </div>
        </div>
      );
    //}
  }
}

const style = {
  height: '360px',
  width: '480px'
}

export default ImageUpload;
