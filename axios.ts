// axiosAdapterFactory.js

import axios from 'axios';

// Default Axios instance configuration
const defaultConfig = {
  baseURL: 'https://api.example.com',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
};

// A factory function to create custom Axios instances
const axiosAdapterFactory = (config = {}) => {
  const finalConfig = { ...defaultConfig, ...config };

  const instance = axios.create(finalConfig);

  // You can add custom interceptors or modify instance behavior here
  instance.interceptors.request.use(
    (config) => {
      // You can modify or log requests before sending them
      console.log('Request made with: ', config);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      // You can process the response here
      console.log('Response received: ', response);
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

export default axiosAdapterFactory;

import axiosAdapterFactory from './axiosAdapterFactory';

// Default Axios instance (baseURL, timeout, headers)
const defaultAxios = axiosAdapterFactory();

// Custom Axios instance with different settings
const customAxios = axiosAdapterFactory({
  baseURL: 'https://api.anotherexample.com',
  timeout: 5000,
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN',
  },
});

// Use the default Axios instance
defaultAxios.get('/path/to/api')
  .then(response => console.log(response))
  .catch(error => console.error(error));

// Use the custom Axios instance
customAxios.get('/path/to/another/api')
  .then(response => console.log(response))
  .catch(error => console.error(error));

