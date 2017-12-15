import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axiosInstance from "../utils/AxiosInstance";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";

class signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      userName: "",
      password: "",
      biography: "",
      signupDate: moment().format("MM-DD-YYYY"),
      favourite: false
    };
    this._addUser = this._addUser.bind(this);
    this._handleChange = this._handleChange.bind(this);
  }

  async _addUser(e) {
    e.preventDefault();
    if (!this._validateFields()) return;
    let payload = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      userName: this.state.userName,
      password: this.state.password,
      biography: this.state.biography,
      signupDate: this.state.signupDate,
      favourite: this.state.favourite
    };
    let response = await axiosInstance.post("/signup", payload);
    console.log(response);
    if (!response.data.error) {
      toast.success("Entry Added Successfully!", {
        position: toast.POSITION.TOP_CENTER
      });
      let redirect = this.props.history;
      setTimeout(function() {
        redirect.push(`/login`);
      }, 2100);
    } else {
      toast.error(response.data.error, {
        position: toast.POSITION.TOP_CENTER
      });
    }
  }

  _validateFields() {
    if (this.state.firstName === "" || this.state.firstName === undefined) {
      toast.warn("first Name Required", {
        position: toast.POSITION.TOP_CENTER
      });
      return false;
    }
    if (this.state.lastName === "" || this.state.lastName === undefined) {
      toast.warn("Last Name Required", {
        position: toast.POSITION.TOP_CENTER
      });
      return false;
    }
    if (this.state.userName === "" || this.state.userName === undefined) {
      toast.warn("User Name Required", {
        position: toast.POSITION.TOP_CENTER
      });
      return false;
    }
    if (this.state.password === "" || this.state.password === undefined) {
      toast.warn("Password Required", {
        position: toast.POSITION.TOP_CENTER
      });
      return false;
    }
    if (this.state.biography === "" || this.state.biography === undefined) {
      toast.warn("Biography Required", {
        position: toast.POSITION.TOP_CENTER
      });
      return false;
    }
    return true;
  }

<<<<<<< HEAD
 

    render() {
        return (
            <div className="container">
                <ToastContainer autoClose={2000} /> 
                <h1>Add User Entry</h1>
                <br/>
                <br/>
                <form>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label" for="firstName"> FirstName </label>
                    <div className="col-sm-10">
                        <input type="text" id="firstName" className="form-control"  placeholder="Enter FirstName" value={this.state.firstName} onChange={this._handleChange} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label" for="lastName"> LastName</label>
                    <div className="col-sm-10">
                        <input type="text" id="lastName" className="form-control" placeholder="Enter LastName" value={this.state.lastName} onChange={this._handleChange} />
                    </div>
                </div>         
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label" for="userName"> UserName</label>
                    <div className="col-sm-10">
                        <input type="text" id="userName" className="form-control" placeholder="Enter UserName" value={this.state.userName} onChange={this._handleChange} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label" for="password"> Password</label>
                    <div className="col-sm-10">
                        <input type="password" id="password" className="form-control" placeholder="Enter Password" value={this.state.password} onChange={this._handleChange} />
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label" for="biography"> Biography</label>
                    <div className="col-sm-10">
                        <input type="text" id="biography" className="form-control" placeholder="Enter Biography" value={this.state.biography} onChange={this._handleChange} />
                    </div>
                </div>
=======
  _handleChange(e) {
    e.preventDefault();
    const target = e.target;
    const value = target.value;
    const name = target.id;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className="container">
        <ToastContainer autoClose={2000} />
        <h1>Add User Entry</h1>
        <br />
        <br />
        <form>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label"> FirstName </label>
            <div className="col-sm-10">
              <input
                type="text"
                id="firstName"
                className="form-control"
                placeholder="Enter FirstName"
                value={this.state.firstName}
                onChange={this._handleChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label"> LastName</label>
            <div className="col-sm-10">
              <input
                type="text"
                id="lastName"
                className="form-control"
                placeholder="Enter LastName"
                value={this.state.lastName}
                onChange={this._handleChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label"> UserName</label>
            <div className="col-sm-10">
              <input
                type="text"
                id="userName"
                className="form-control"
                placeholder="Enter UserName"
                value={this.state.userName}
                onChange={this._handleChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label"> Password</label>
            <div className="col-sm-10">
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter Password"
                value={this.state.password}
                onChange={this._handleChange}
              />
            </div>
          </div>
>>>>>>> eb7a80ec68a8e373788e96137396903fd0e6bb1d

          <div className="form-group row">
            <label className="col-sm-2 col-form-label"> Biography</label>
            <div className="col-sm-10">
              <input
                type="text"
                id="biography"
                className="form-control"
                placeholder="Enter Biography"
                value={this.state.biography}
                onChange={this._handleChange}
              />
            </div>
          </div>
        </form>

        <br />

        <form onSubmit={this._addUser}>
          <button className="btn btn-success">Add User</button>
        </form>
      </div>
    );
  }
}

export default signup;
