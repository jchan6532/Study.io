import axios from 'axios';

const useGetQuizzes = () => {
  const fetchQuizzes = async (token) => {
    try {
      const response = await axios.get('https://study-io-backend.vercel.app/quiz/all', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return response.data
    } catch (error) {
      console.error(error.message);
    }
  }

  return { fetchQuizzes };
}

export default useGetQuizzes;