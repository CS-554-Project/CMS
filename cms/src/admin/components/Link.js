import React, { Component } from "react";

class Link extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.data.value ? this.props.data.value.title : "",
      url: this.props.data.value ? this.props.data.value.url : ""
    };
  }

  handleChange2(title, url) {
    if (this.state.title.length > 0) {
      this.setState({ title: title });
    } else if (this.state.url.length > 0) {
      this.setState({ url: url });
    }

    if (this.state.title.length > 0 && this.state.url.length > 0) {
      this.props.handleInputChange({
        data: { title: title, url: url },
        target: { id: this.props.data.label, type: "link" }
      });
    }
  }

  handleChange(isTitle, data) {
    if (isTitle) {
      this.setState({ title: data }, () => {
        if (this.state.title.length > 0 && this.state.url.length > 0) {
          this.props.handleInputChange({
            data: { title: this.state.title, url: this.state.url },
            target: { id: this.props.data.label, type: "link" }
          });
        }
      });
    } else {
      this.setState({ url: data }, () => {
        if (this.state.title.length > 0 && this.state.url.length > 0) {
          this.props.handleInputChange({
            data: { title: this.state.title, url: this.state.url },
            target: { id: this.props.data.label, type: "link" }
          });
        }
      });
    }
  }

  render() {
    return (
      <div className="form-group row">
        <label className="col-sm-2 col-form-label" for={this.props.data.label}>
          {this.props.data.label}
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            onChange={e => this.handleChange(true, e.target.value)}
            placeholder="Title"
            className="form-control"
            value={this.state.title}
          />
          <br />
          <input
            type="text"
            onChange={e => this.handleChange(false, e.target.value)}
            placeholder="URL"
            className="form-control"
            value={this.state.url}
          />
        </div>
      </div>
    );
  }
}

export default Link;
