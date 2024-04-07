import axios from 'axios';

export const authApi = axios.create({
  baseURL: 'https://study-io-backend.vercel.app/auth'
});