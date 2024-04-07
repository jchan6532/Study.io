import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import { Alert } from '@mui/material';
import { useTheme } from '@emotion/react';

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const Toast = ({open, setOpen, message, severity}) => {
  const theme = useTheme();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        open={open}
        onClose={handleClose}
        TransitionComponent={SlideTransition}
        autoHideDuration={6000}
        anchorOrigin={{
          vertical: 'bottom', 
          horizontal: 'center'
        }}
        sx={{ 
          width: '500px', 
          height: '100px'
        }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ 
            width: '100%',
            fontSize: '14px',
            color: `${theme.palette.mode === 'dark' ? "text.secondary" : 'primary.dark'}`
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Toast;