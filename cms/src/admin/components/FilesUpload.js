import React, { Component } from "react";
import Dropzone from 'react-dropzone';

class FilesUpload extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {
  //         file: ""
  //     }
  //     this._handleImageChange = this._handleImageChange.bind(this);
  //     this._handleSubmit = this._handleSubmit.bind(this);
  // }

  // _handleImageChange(e) {
  //     e.preventDefault();

  //     let reader = new FileReader();
  //     let file = e.target.files[0];

  //     reader.onloadend = () => {
  //       this.setState({
  //         file: file
  //       });
  //     }
  //     reader.readAsDataURL(file)
  // }

  // _handleSubmit(e) {
  //     e.preventDefault();
  // }

  // render() {
  //     return (
  //         <div>
  //             <form onSubmit={this._handleSubmit}>
  //                 <input type="file" onChange={this._handleImageChange} />
  //                 <button type="submit" onClick={this._handleSubmit}>Upload Image</button>
  //             </form>
  //         </div>
  //     )
  // }

  render() {
    return (
      <form onSubmit={this._handleSubmit}>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">{this.props.data.label}</label>
          <div className="col-sm-10">
            <input type="file" id={this.props.data.label} className="form-control" onChange={this.props.handleInputChange} />
          </div>
        </div>
      </form>
    );
  }
}

export default FilesUpload;
