import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';
class authservice {
    
      login(email, password) {
        const options = {
          url: 'http://localhost:9000/user/login',
          method: 'POST',
          body: JSON.stringify({
            "email": email,
            "password": password
          })
        };
        return new Promise((resolve, reject) => {
          request(options, (error, response, body) => {
            if(response.statusCode >= 200 &&  response.statusCode <= 304) {
              body = JSON.parse(body);
              if(body.access_granted)  
                resolve(loginUser(body.token));
              else reject("Email/Pass is Invalid");
            }
            else reject("Email/Pass is Invalid");
          })
        });
      }
    }
    
    export default new authservice()  