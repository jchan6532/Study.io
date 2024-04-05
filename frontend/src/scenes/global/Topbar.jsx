import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, useEffect } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import LoginIcon from "@mui/icons-material/Login"
import LogoutIcon from "@mui/icons-material/Logout"
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";


const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const { login, logout, isLoggedIn } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => console.log(isLoggedIn), [isLoggedIn]);
    return (
        <Box
          display="flex" 
          justifyContent="space-between" 
          p={2}
        >
            <Box 
              display="flex" 
              backgroundColor={colors.primary[400]} 
              borderRadius="3px"
            >
              <InputBase sx={{ml: 2, flex: 1}} placeholder="Search" />
              <IconButton type="button" sx={{p: 1}}>
                <SearchIcon />
              </IconButton>
            </Box>
            
            <Box display="flex">
              <IconButton onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === 'dark' ? 
                  <DarkModeOutlinedIcon /> :
                  <LightModeOutlinedIcon />
                }
              </IconButton>
              <IconButton>
                <NotificationsOutlinedIcon />
              </IconButton>
              <IconButton>
                <SettingsOutlinedIcon />
              </IconButton>
              <IconButton>
                <PersonOutlinedIcon />
              </IconButton>
              <IconButton onClick={() => {
                if(isLoggedIn){
                  logout();
                  navigate('/login');
                }
                else{
                  login();
                  navigate('/login');
                }
              }}>
                {isLoggedIn ? (<LogoutIcon />) : (<LoginIcon />)}
              </IconButton>
            </Box>
        </Box>
    );
}

export default Topbar;