import { studyMaterialsApi } from "../services/studyMaterials";

const useUploadFile = () => {
  const uploadFile = async (file, title, token) => {
    const formData = new FormData();
    formData.append('document', file);
    formData.append('title', title);
    
    const response = await studyMaterialsApi.post('/new', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  }

  return { uploadFile };
}

export default useUploadFile;