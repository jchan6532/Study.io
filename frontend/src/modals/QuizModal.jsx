import React, { useState, forwardRef } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { DialogActions, Slide, Toolbar, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import { useAuthContext } from '../contexts/AuthContext';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const QuizModal = ({open, setOpen, quiz, handleToast}) => {
  const theme = useTheme();
  const [answers, setAnswers] = useState({});
  const questions = quiz.QuizQuestions;
  const { setMarks } = useAuthContext();

  const handleSubmit = () => {
    const indexToOptionLetter = (index) => String.fromCharCode(65 + index);

    const correctAnswers = questions?.map(question => question.MCQ.mcq_answer);

    let score = 0;
    questions.forEach((question, index) => {
      const mcqOptions = question.MCQ.mcq_options;

      const userAnswer = mcqOptions.indexOf(answers[index]);
      const userLetter = indexToOptionLetter(userAnswer);
      if (userLetter === correctAnswers[index]) score += 1;
    });
    const scorePercentage = (score / questions.length) * 100;
    setMarks((prev) => [...prev, scorePercentage]);
    setOpen(false);
    setAnswers({});
    handleToast(`You Scored ${scorePercentage} %`, 'success', true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRadioChange = (event, questionId) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: event.target.value,
    }));
  };

  return (
    <>
      <Dialog 
        open={open} 
        onClose={handleClose}
        TransitionComponent={Transition}
        transitionDuration={2000}
      >
        <DialogTitle>
          <Typography variant='h6'>Quiz for '{quiz.name}'</Typography>
        </DialogTitle>
        <DialogContent>
          {questions?.map((question, index) => {
            return (
              <div key={index}>
                <DialogContentText>
                  <Typography variant='h6'>{question.question}</Typography>
                </DialogContentText>
                <RadioGroup
                  aria-label="options"
                  name={`radio-buttons-group-${index}`}
                  value={answers[index] || ''}
                  onChange={(event) => handleRadioChange(event, index)}
                >
                  {question.MCQ.mcq_options?.map((option, optionIndex) => {
                    return (
                      <FormControlLabel 
                        key={optionIndex}
                        value={option} 
                        control={<Radio />} 
                        label={option} 
                      />
                    );
                  })}
                </RadioGroup>
                <Toolbar />
              </div>
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleClose}
            sx={{
              borderRadius: 10,
              color: `${theme.palette.mode === 'dark' ? "text.secondary" : 'primary.dark'}`,
              '&:hover': {
                backgroundColor: `${theme.palette.mode === 'dark' ? 'primary.dark' : 'success.light'}`
              },
            }}
          >
              Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            sx={{
              borderRadius: 10,
              color: `${theme.palette.mode === 'dark' ? "text.secondary" : 'primary.dark'}`,
              '&:hover': {
                backgroundColor: `${theme.palette.mode === 'dark' ? 'primary.dark' : 'success.light'}`
              },
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default QuizModal;