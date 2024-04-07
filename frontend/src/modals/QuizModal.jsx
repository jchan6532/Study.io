import React, { useState, forwardRef } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { Slide } from '@mui/material';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const QuizModal = ({open, setOpen, quiz}) => {
  const handleClose = () => {
    setOpen(false);
  };

  const handleRadioChange = (event) => {
    
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      TransitionComponent={Transition}
      transitionDuration={2000}
    >
      <DialogTitle>Quiz for '{quiz.name}'</DialogTitle>
      <DialogContent>
        {quiz.Quizquestions?.map(question => {
          return (
            <DialogContentText>
              {question.question}:
            </DialogContentText>
          );
        })}
        <RadioGroup
          aria-label="options"
          name="radio-buttons-group"
          onChange={handleRadioChange}
        >
          <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
          <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
          <FormControlLabel value="option3" control={<Radio />} label="Option 3" />
        </RadioGroup>
      </DialogContent>
    </Dialog>
  );
}

export default QuizModal;