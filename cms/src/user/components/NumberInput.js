import React, { Component } from "react";

class NumberInput extends Component {
  render() {
    return (
      <div className="form-group row">
        <label className="col-sm-2 col-form-label" for={this.props.data.label}>
          {this.props.data.label}
        </label>
        <div className="col-sm-10">
          <input
            type="number"
            id={this.props.data.label}
            readOnly
            className="form-control"
            value={this.props.data.value}
          />
        </div>
      </div>
    );
  }
}

export default NumberInput;
