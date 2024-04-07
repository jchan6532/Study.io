import axios from 'axios';

export const studyMaterialsApi = axios.create({
  baseURL: 'http://localhost:5000/study-materials'
});