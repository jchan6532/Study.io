import { Box, Toolbar, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import ProgressCircle from '../../components/ProgressCircle';
import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import useGetQuizzes from "../../hooks/useGetQuizzes";
import useGetConcepts from "../../hooks/useGetConcepts";
import moment from "moment";

const getAverage = (marks) => {
  let sum = 0;
  marks.forEach(mark => {
    sum += mark;
  });
  if (marks.length === 0) return 0;
  const avg = sum / marks.length;
  return parseInt(avg);
}

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (minutes < 10 && remainingSeconds < 10) return `0${minutes} : 0${remainingSeconds}`;
  if (remainingSeconds < 10) return `${minutes} : 0${remainingSeconds}`;
  if (minutes < 10) return `0${minutes} : ${remainingSeconds}`;
  return `${minutes} : ${remainingSeconds}`;
};

const pomodoroMax = 600;

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { 
    isLoggedIn, 
    quizzes, 
    marks, 
    setQuizzes, 
    user, 
    setConcepts, 
    concepts
  } = useAuthContext();
  const navigate = useNavigate();

  const { fetchQuizzes } = useGetQuizzes();
  const { fetchConcepts } = useGetConcepts();

  const [seconds, setSeconds] = useState(pomodoroMax);
  useEffect(() => {

    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds <= 1) {
          clearInterval(intervalId);
          return 0;
        } else {
          return prevSeconds - 1;
        }
      });
    }, 1000);
    return () => clearInterval(intervalId);
 }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (!user) return;
    const getQuizzes = async () => {
      const token = await user?.getIdToken();
      const data = await fetchQuizzes(token);
      setQuizzes(data);
    }
    getQuizzes();

    const getConcepts = async () => {
      const data = await fetchConcepts(user.uid);
      setConcepts(data);
    }
    getConcepts();
  }, [user])
  
  return (

    <Box margin="20px">
      <Box 
        display="flex" 
        justifyContent="space-between" 
        alignItems="center"
      >
        <Header 
          title={"DASHBOARD"}
          subtitle={"Your Personalized AI Assisted Study Partner"}
        />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gap="20px"
      >

        {/* ROW 1 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          borderRadius={10}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                Current Quizzes
              </Typography>
            </Box>
          </Box>
          <Box height="250px" overflow={'auto'}>
            {quizzes?.map((quiz, i) => (
              <Box
                key={i}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
                ml='25px'
                mr={'25px'}
              >
                <Box color={colors.grey[100]}>{quiz.name}</Box>
                <Box
                  backgroundColor={colors.greenAccent[500]}
                  p="5px 10px"
                  borderRadius="4px"
                  fontSize={'18px'}
                >
                  {marks[i] || 'N/A'}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 4"
          backgroundColor={colors.primary[400]}
          p="30px"
          borderRadius={10}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            color={colors.greenAccent[500]}
          >
            Pomodoro Timer
          </Typography>
          <Toolbar />
          <Typography variant="h1" fontWeight="600" fontSize={'100px'}>
            {formatTime(seconds)}
          </Typography>
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
          borderRadius={10}
        >
          <Typography variant="h5" fontWeight="600">
            Statistics
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" progress={getAverage(marks)/100} />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              Your Current Average Score is <strong>{getAverage(marks)} %</strong>
            </Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow={'auto'}
          borderRadius={10}
        >
          <Box
            display={'flex'}
            flexDirection={'row'}
            justifyContent={'space-between'}
          >
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ padding: "30px 30px 0 30px" }}
            >
              Concepts Learned
            </Typography>
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ padding: "30px 50px 0 30px" }}
            >
              Time
            </Typography>
          </Box>
          <Box height="250px" mt={'20px'} marginBottom={'100px'}>
          {concepts?.map((conceptObj, i) => (
            <Box
              key={i}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
              ml='25px'
              mr={'25px'}
            >
              <Box color={colors.grey[100]} fontSize={'18px'}>{conceptObj.concept}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
                fontSize={'18px'}
              >
                {moment(conceptObj.updatedAt).fromNow()}
              </Box>
            </Box>
          ))}
          <Toolbar />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard;