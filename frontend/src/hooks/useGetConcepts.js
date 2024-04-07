import axios from 'axios';

const useGetConcepts = () => {
  const fetchConcepts = async (id) => {
    try {
      const response = await axios.get(`https://study-io-backend.vercel.app/users/${id}/concepts`);
      console.log(response.data);
      return response.data.concepts;
    } catch (error) {
      console.error('Error fetching user concepts:', error);
      return [];
    }
  }

  return { fetchConcepts };
}

export default useGetConcepts;