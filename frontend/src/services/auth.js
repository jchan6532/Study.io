import axios from 'axios';

export const authApi = axios.create({
  baseURL: 'https://study-io-omzo.vercel.app/auth'
});