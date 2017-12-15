import React, { Component } from "react";

class CheckBox extends Component {
  render() {
    return (
      <div className="form-group">
        <div className="form-check">
          <label className="form-check-label">
            <input
              type="checkbox"
              id={this.props.data.label}
              readOnly
              className="form-check-input"
              checked={this.props.data.value}
            />
            {this.props.data.label}
          </label>
        </div>
      </div>
    );
  }
}

export default CheckBox;
