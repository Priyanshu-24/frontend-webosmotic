import axios from 'axios';

const api = axios.create({
  baseURL: 'https://priyanshu-backend.herokuapp.com/'
});

export default api;
