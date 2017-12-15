import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import axiosInstance from "../../utils/AxiosInstance";

class ListUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersList: []
    };
    this._getUsersList = this._getUsersList.bind(this);
    this._updateUser = this._updateUser.bind(this);
  }

  componentWillMount() {
    this._getUsersList();
  }

  async _getUsersList() {
    let response = await axiosInstance.get("/admin/listusers");
    this.setState({
      usersList: response.data
    });
  }

  async _updateUser(_id) {
    let payload = {
      id: _id
    };
    let response = await axiosInstance.put("/admin/updateuser", payload);
    if (!response.data.error) {
      this._getUsersList();
    } else {
      toast.error(response.data.error, {
        position: toast.POSITION.TOP_CENTER
      });
    }
  }

  render() {
    const { match } = this.props;
    const { url } = match;
    if (this.state.usersList.length > 0) {
      return (
        <div>
          <ToastContainer autoClose={2000} />
          <h1>List Users</h1>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Admin</th>
                <th>Make Admin</th>
              </tr>
            </thead>
            <tbody>
              {this.state.usersList.map((user, index) => (
                <tr key={index}>
                  <td>{user.firstname}</td>
                  <td>{user.isAdmin ? "Admin" : "User"}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      disabled={user.isAdmin ? true : false}
                      onClick={() => this._updateUser(user._id)}
                    >
                      Promote
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <div className="error">No Users entry yet !!</div>;
    }
  }
}

export default ListUsers;
