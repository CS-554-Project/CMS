import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import axiosInstance from "../../utils/AxiosInstance";

class ListStructures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      structureList: []
    };
    this._getStructureList = this._getStructureList.bind(this);
    this._editStructure = this._editStructure.bind(this);
    this._newEntryForm = this._newEntryForm.bind(this);
    this._listEntries = this._listEntries.bind(this);
  }

  componentWillMount() {
    this._getStructureList();
  }

  async _getStructureList() {
    let response = await axiosInstance.get("/admin/liststructures");
    this.setState({
      structureList: response.data
    });
  }

  _editStructure(structure) {
    this.props.history.push({
      pathname: `/admin/structures/${structure.slug}`,
      state: { structure: structure }
    });
  }

  async _deleteStructure(structure) {
    let payload = {
      slug: structure.slug
    };
    let response = await axiosInstance.delete("/admin/deletestructure", {
      data: payload
    });
    if (!response.data.error) {
      this._getStructureList();
    } else {
      toast.error(response.data.error, {
        position: toast.POSITION.TOP_CENTER
      });
    }
  }

  _newEntryForm(structure) {
    this.props.history.push({
      pathname: `/admin/structures/${structure.slug}/new`,
      state: { structure: structure }
    });
  }

  _listEntries(structure) {
    this.props.history.push({
      pathname: `/admin/structures/${structure.slug}/list`,
      state: { structure: structure }
    });
  }

  render() {
    const { match } = this.props;
    const { url } = match;
    if (this.state.structureList.length > 0) {
      return (
        <div>
          <ToastContainer autoClose={2000} />
          <h1>List Structures</h1>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Structure</th>
                <th>Structure</th>
                <th>Entry</th>
                <th>Entries</th>
              </tr>
            </thead>
            <tbody>
              {this.state.structureList.map((structure, index) => (
                <tr key={index}>
                  <td>{structure.name}</td>
                  <td>{structure.description}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => this._editStructure(structure)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => this._deleteStructure(structure)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => this._newEntryForm(structure)}
                    >
                      Add
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => this._listEntries(structure)}
                    >
                      List
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <div className="error">No Structure entry yet !!</div>;
    }
  }
}

export default ListStructures;
