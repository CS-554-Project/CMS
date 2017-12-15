import React, { Component } from "react";

class WysiwygEditor extends Component {
  rawMarkup() {
    var rawMarkup = this.props.data.value;
    return { __html: rawMarkup };
  }

  render() {
    return (
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">
          {this.props.data.label}
        </label>
        <div className="col-sm-10">
          <span dangerouslySetInnerHTML={this.rawMarkup()} />
        </div>
      </div>
    );
  }
}

export default WysiwygEditor;
