import React, { forwardRef } from 'react';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { 
  Fab, 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle, 
  Slide,
  Box,
  IconButton,
  Input,
  Typography,
  Toolbar
} from '@mui/material';
import CloudUpload from '@mui/icons-material/CloudUpload';
import './UploadFileDialog.css';
import { useTheme } from '@emotion/react';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NotificationModal = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFile(null);
  };

  const handleSubmit = () => {
    console.log(selectedFile);
    setOpen(false);
  }

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          top: 80, 
          left: 80,
        }}
      >
        <Fab color="default" aria-label="add" size="small" onClick={handleClickOpen}>
          <AddIcon />
        </Fab>
      </Box>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="sm"
        fullWidth
      >
        <IconButton 
          onClick={handleClose} 
          sx={{
              position: 'absolute',
              top: 8,
              right: 8
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle>Notification</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Typography variant='h4'>Please Choose a file to upload as your study notes:</Typography>
          </DialogContentText>
          <Toolbar />
          <div className="upload-video-box">
            <CloudUpload fontSize="large" />
            <Typography variant="h6">
              Choose a file or drag & drop it here
            </Typography>
            <div>
              <Button
                variant="outlined"
                component="label"
                color={theme.palette.mode === 'dark' ? 'secondary' : 'primary'}
                sx={{ 
                  borderRadius: '0.5rem',
                  padding: '1vh 2vw'
                }}
              >
                <input
                  hidden
                  type="file"
                  id="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                />
                Upload
              </Button>
            </div>
            <Typography 
              variant="body1" 
              color={theme.palette.mode === 'dark' ? 'neutral' : 'primary'}
            >
              {selectedFile?.name}
            </Typography>
          </div>
        </DialogContent>
        <DialogActions>
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
        </DialogActions>
      </Dialog>
    </>
  );
}

export default NotificationModal;