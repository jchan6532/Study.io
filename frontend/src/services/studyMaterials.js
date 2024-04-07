import axios from 'axios';

export const studyMaterialsApi = axios.create({
  baseURL: '/study-materials'
});