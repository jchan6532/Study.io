import { ColorModeContext, useMode } from "./theme.js";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar.jsx";
import Sidebar from "./scenes/global/Sidebar.jsx";
import Dashboard from "./scenes/dashboard/index.jsx";
import Team from "./scenes/team/index.jsx";
import Invoices from "./scenes/invoices/index.jsx";
import Contacts from "./scenes/contacts/index.jsx";
import Form from "./scenes/form";
// import Line from "./scenes/line";
// import FAQ from "./scenes/faq";
import Calendar from "./scenes/calendar";
import Login from "./scenes/login/index.jsx";
import { useAuthContext } from "./contexts/AuthContext.jsx";
import UploadFileDialog from "./modals/UploadFileDialog.jsx";
import Toast from "./components/Toast.jsx";
import { useEffect, useState } from "react";
import { useSocketContext } from "./contexts/SocketContext.jsx";


function App() {
  const [theme, colorMode] = useMode();
  const { isLoggedIn, user } = useAuthContext();
  const [notifcation, setNotification] = useState(false);
  const [message, setMessage] = useState('');
  const {socket} = useSocketContext();

  useEffect(() => {
    console.log(isLoggedIn, socket);
    //if (!isLoggedIn) return;
    if (socket) {
      socket.on(`upload`, (data) => {
        console.log(data);
        setMessage(data.message);
        setNotification(true);
      });

      return () => {
        socket.off(`${user?.uid}`);
      };
    }
  }, [socket, user])

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isLoggedIn && <Sidebar />}
          <main className="content">
            {isLoggedIn && <Topbar />}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/form" element={<Form />} />
              {/* <Route path="/line" element={<Line />} /> */}
              {/* <Route path="/faq" element={<FAQ />} /> */}
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/login" element={<Login />} />
            </Routes>

            {isLoggedIn && <UploadFileDialog />}
            {notifcation && <Toast open={notifcation} setOpen={setNotification} message={message} severity={'success'} />}
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
