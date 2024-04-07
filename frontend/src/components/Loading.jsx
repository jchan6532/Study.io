import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import './Loading.css';

const Loading = ({open}) => {
  return(
    <Backdrop
      open={open}
      sx={{
        color: '#fff',
        zIndex: 1400,
        display: 'flex',
        flexDirection: 'column',
        gap: 5
      }}
    >
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress
          variant={'indeterminate'}
          size={90}
          color="inherit"
        />
      </Box>
      <Typography variant="h5" className="loading-text" sx={{ ml: 3 }}>
        Uploading Your File
      </Typography>
    </Backdrop>
  );
}

export default Loading;