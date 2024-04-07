import axios from 'axios';

export const studyMaterialsApi = axios.create({
  baseURL: 'https://study-io-backend.vercel.app/study-materials'
});