import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { AlertTitle } from '@mui/material';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Notification({
  message,
  open,
  setClose,
  type,
}) {
  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setClose(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={open}
        autoHideDuration={10000}
        onClose={handleClose}
      >
        <Alert
          variant="standard"
          onClose={handleClose}
          severity={type}
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <AlertTitle sx={{ mb: -0.3 }}>{message}</AlertTitle>
        </Alert>
      </Snackbar>
    </div>
  );
}