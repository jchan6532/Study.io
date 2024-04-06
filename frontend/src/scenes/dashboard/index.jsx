import { Box } from "@mui/material";
import Header from "../../components/Header";
import { useEffect } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { isLoggedIn } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, []);
  
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
    </Box>
  )
}

export default Dashboard;