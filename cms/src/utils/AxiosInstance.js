import axios from 'axios';

const apiRoot = 'http://localhost:3001';
const instance = axios.create();

// Add a request interceptor
instance.interceptors.request.use(
  function(config) {
    
    config.url = `${apiRoot}${config.url}`;
    console.log(config.url);
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default instance;