import { authApi } from "../services/auth";

const useSigninProvider = () => {
  const signinProvider = async (token) => {
    const response = await authApi.post(`/provider-signin`, 
    { 
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }

  return { signinProvider };
}

export default useSigninProvider;