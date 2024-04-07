import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { Box } from "@mui/system";
import Header from "../../components/Header";
import QuizCard from '../../components/QuizCard';
import useGetQuizzes from '../../hooks/useGetQuizzes';
import Toast from "../../components/Toast";

const Quizzes = () => {
  const { user, quizzes, setQuizzes } = useAuthContext();
  const { fetchQuizzes } = useGetQuizzes();
  const [openToast, setOpenToast] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');

  useEffect(() => {
    if (!user) return;

    const getQuizzes = async () => {
      const token = await user?.getIdToken();
      const data = await fetchQuizzes(token);
      setQuizzes(data);
    }

    getQuizzes();
  }, [user])

  const handleToast = (message, severity, state) => {
    setMessage(message);
    setSeverity(severity);
    setOpenToast(state);
  }

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
        {quizzes?.map(quiz => {
          return (
            <QuizCard quiz={quiz} handleToast={handleToast}/>
          )
        })}
      </Box>
      <Toast message={message} severity={severity} open={openToast} setOpen={setOpenToast} />
    </Box>
  );

}

export default Quizzes;