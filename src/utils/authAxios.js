import axios from 'axios';

const authAxios = axios.create();

authAxios.interceptors.request.use(
  config => {
    config.headers.authorization = localStorage.token;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default authAxios;
