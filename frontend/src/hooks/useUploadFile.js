import { studyMaterialsApi } from "../services/studyMaterials";

const useUploadFile = () => {
  const uploadFile = async (userId) => {
    const response = await studyMaterialsApi.get(`/${userId}`);
    return response.data;
  }

  return { uploadFile };
}

export default useUploadFile;