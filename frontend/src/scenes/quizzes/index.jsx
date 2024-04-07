import { useEffect, useState } from "react";
import axios from 'axios';
import { useAuthContext } from "../../contexts/AuthContext";
import { Box } from "@mui/system";
import Header from "../../components/Header";
import QuizCard from '../../components/QuizCard'

const Quizzes = () => {
  const { user } = useAuthContext();
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const token = await user?.getIdToken();
        const response = await axios.get('http://localhost:5000/quiz/all', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setQuizzes(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchQuizzes();
  }, [user])

  return (
    <Box margin={'40px'}>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Header
          title={'QUIZZES'}
          subtitle={'Dive into Your Past Quizzes Right Here'}
        />
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        gap="40px"
      >
        {quizzes.map(quiz => {
          return (
            <QuizCard quiz={quiz} />
          )
        })}
      </Box>
    </Box>
  );

}

export default Quizzes;