import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Collapsible from "react-collapsible";
import axiosInstance from "../../utils/AxiosInstance";
import { Button } from "react-bootstrap";

class ReferenceEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allStructures: null,
      activeButton: ""
    };

    this._fetchAllStructures().then(data =>
      this.setState({
        allStructures: data
      })
    );
    console.log(this.props);
  }

  async _fetchAllStructures() {
    let response = await axiosInstance.get("/admin/listallstructures", {});
    return response.data;
  }

  handleClick(e, entry, eidx) {
    this.setState({ activeButton: eidx });
    return this.props.handleInputChange({
      entryID: entry._id,
      target: { id: this.props.data.label, type: "reference-entry" }
    });
  }

  renderStructures(structureSlug) {
    const { allStructures } = this.state;
    if (allStructures) {
      return allStructures.map((struct, sidx) => {
        if (struct.entries.length > 0) {
          return (
            <Collapsible
              trigger={struct.name}
              key={sidx}
              style={{ backgroundColor: "red" }}
            >
              {struct.entries.map((entry, eidx) => {
                return (
                  <div key={entry.title + eidx}>
                    <Button
                      type="button"
                      onClick={e => this.handleClick(e, entry, eidx)}
                      style={styles.indentLeft}
                      bsStyle={
                        this.state.activeButton === eidx ? "primary" : undefined
                      }
                    >
                      {entry.title}
                    </Button>
                  </div>
                );
              })}
            </Collapsible>
          );
        }
      });
    }
  }

  render() {
    return (
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">
          {this.props.data.label}
        </label>
        <div className="col-sm-10">
          {this.renderStructures(this.props.structureSlug)}
        </div>
      </div>
    );
  }
}

const styles = {
  active: {
    backgroundColor: "blue",
    fontColor: "white"
  },
  indentLeft: {
    marginLeft: "40px",
    borderBottom: "1px solid gray"
  }
};

export default ReferenceEntry;
