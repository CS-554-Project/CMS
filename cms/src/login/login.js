import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import axiosInstance from '../utils/AxiosInstance';
import SetAuthorizationToken from '../utils/SetAuthorizationToken';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
        this._handleChange = this._handleChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this._validateFields = this._validateFields.bind(this);
    }

    _handleChange(e) {
        e.preventDefault();
        let target = e.target;
        let value = target.value;
        let name = target.id;
        this.setState({
          [name]: value
        });
    }
      
    async _handleSubmit(event) {
        event.preventDefault();
        //if(!this._validateFields()) return;

        let payload = {
            username: this.state.username,
            password: this.state.password
        }
        



        let response = await axiosInstance.post('/login', payload);
        if(response !== undefined) {
            const token = response.data.token;
            const admin = response.data.admin;
            localStorage.setItem('jwtToken', token);
            localStorage.setItem('admin', admin);
            SetAuthorizationToken(token);
            if(admin) {
                this.props.history.push('/admin');
            } else {
                this.props.history.push('/');
            }
        }
    }

    _validateFields() {
        if(this.state.username === '' || this.state.username === undefined) {
            alert('Username is Required');
            return false;
        }
        if(this.state.password === '' || this.state.password === undefined) {
            alert('Password is Required');
            return false;
        }
    }

    _addUser(structure) {
        this.props.history.push({
            pathname: `/signup`,
        });
    }

    render() {
        return (
            <div className="container">
            <div className='col-sm-10'>
                <h1>Login</h1>
            </div>
                <form onSubmit={this._handleSubmit}>
                    <div className='form-group'>
                        <label className='col-sm-2 col-form-label'>Username</label>
                        <div className='col-sm-10'>
                            <input type='text' id='username' className='form-control' placeholder='Username' value={this.state.username} onChange={this._handleChange} />
                        </div>
                    </div>
                        
                    <div className='form-group'>
                        <label className='col-sm-2 col-form-label'>Password</label>
                        <div className='col-sm-10'>
                            <input type='password' id='password' className='form-control' placeholder='Password' value={this.state.password} onChange={this._handleChange} />
                        </div>
                    </div>
            
                  
                        <div className='col-sm-10 '>
                            <button id="btnlogin"className="btn btn-success btn-md center-block">Login</button>
                            </div>
    
                          

                        <div className='col-sm-10 '>
                            <button id="btnsignup" onClick={() => this._addUser()} className="btn btn-success btn-md center-block">SignUp</button>
                        </div>

                        
                   
                    
                </form>

            </div>
        );
    }
}

export default Login;