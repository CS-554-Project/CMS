import React, { Component } from "react";

class TextArea extends Component {
  render() {
    return (
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">
          {this.props.data.label}
        </label>
        <div className="col-sm-10">
          <textarea
            rows="4"
            cols="40"
            className="form-control"
            id={this.props.data.label}
            value={this.props.data.value ? this.props.data.value : ""}
            onChange={this.props.handleInputChange}
          />
        </div>
      </div>
    );
  }
}

export default TextArea;
