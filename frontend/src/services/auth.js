import axios from 'axios';

export const authApi = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/auth`
});