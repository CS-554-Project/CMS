import React, { Component } from "react";

class ListFields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      structureFields: props.data
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ structureFields: nextProps.data });
  }

  _removeField(field) {
    this.props.removeField(field);
  }

  render() {
    if (this.state.structureFields.length > 0) {
      return (
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Field Label</th>
              <th>Field Type</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {this.state.structureFields.map((field, index) => {
              return (
                <tr key={index}>
                  <td>{field.label}</td>
                  <td>{field.type}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        this._removeField(field);
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    } else {
      return null;
    }
  }
}

export default ListFields;
