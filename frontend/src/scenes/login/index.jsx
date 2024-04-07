import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useAuthContext } from '../../contexts/AuthContext';
import { ColorModeContext, tokens } from "../../theme";
import { useTheme } from '@mui/material';
import './login.css'

const Copyright = (props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link 
        color="inherit" 
        href="https://github.com/jchan6532/Study.io" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        Study.io
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const ModeToggle = (toggle) => {
  const theme = useTheme();

  return (
    <Box m={'15px'}>
      <Button
        variant="soft"
        onClick={toggle}
      >
        {theme.palette.mode === 'dark' ? <WbSunnyIcon /> : <DarkModeIcon />}
      </Button>
    </Box>
  );
}

const Login = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const { login, isLoggedIn, logout, googleSignIn } = useAuthContext();
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user } = useAuthContext();

  useEffect(() => {
    if(isLoggedIn)  {
      logout();
    }

    const savedLoginData = localStorage.getItem('loginData');
    if (savedLoginData) {
      const { email, password, rememberMe } = JSON.parse(savedLoginData);
      setEmail(email);
      setPassword(password);
      setRememberMe(rememberMe);
    }
  }, []);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleRememberMeChanged = (event) => {
    setRememberMe(event.target.checked);
  };
  
  const handleLogin = (event) => {
    event.preventDefault();

    if (rememberMe) localStorage.setItem('loginData', JSON.stringify({ email, password, rememberMe }));
    else localStorage.removeItem('loginData');

    const user = {email,password};
    login(user);
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(../../assets/studyio-logo.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        {ModeToggle(colorMode.toggleColorMode)}
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleLogin} sx={{ mt: 1, pl: 5, pr: 5 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" checked={rememberMe} color="default"/>}
              label="Remember me"
              onChange={handleRememberMeChanged}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2}}
            >
              Sign In
            </Button>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Button
                variant="contained"
                className="button-style"
                startIcon={<img height="28" alt="Google logo" src="/assets/google-logo.svg" />}
                onClick={handleGoogleSignIn}
              >
                <Typography 
                  variant="button" 
                  color={theme.palette.mode === 'dark' ? "text.secondary" : '#ffffff'} 
                  noWrap 
                  align='center'
                >
                  Sign in with Google
                </Typography>
              </Button>
            </Box>
            <br />
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" color="text.secondary">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" color="text.secondary">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Login;