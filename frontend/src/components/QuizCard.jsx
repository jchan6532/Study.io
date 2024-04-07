import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import moment from 'moment';
import QuizModal from '../modals/QuizModal';

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 240,
  height: 240,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'center',
  transition: 'background-color 0.3s',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  position: 'relative',
}));

const QuizCard = ({quiz, handleToast}) => {
  const [openQuizModal, setOpenQuizModal] = useState(false);

  return (
    <>
      <DemoPaper 
        elevation={24} 
        square={false} 
        variant="elevation"
        onClick={() => setOpenQuizModal(true)}      
      >
        <Typography variant='h3'>{quiz.name}</Typography>
        <Typography 
          variant='subtitle1' 
          sx={{
            margin: '20px',
            fontStyle: 'italic',
            color: 'text.secondary',
            padding: '4px',
            borderRadius: '4px',
            position: 'absolute',
            bottom: 0,
            right: 0,
          }}
        >
          {moment(quiz.createdAt).fromNow()}
        </Typography>
      </DemoPaper>
      <QuizModal open={openQuizModal} setOpen={setOpenQuizModal} quiz={quiz} handleToast={handleToast}/>
    </>
  );
}

export default QuizCard;