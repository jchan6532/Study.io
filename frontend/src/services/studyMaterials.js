import axios from 'axios';

export const studyMaterialsApi = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/study-materials`
});