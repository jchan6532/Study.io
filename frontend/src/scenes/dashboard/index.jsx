import { Box } from "@mui/material";
import Header from "../../components/Header";

const Dashboard = () => {
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