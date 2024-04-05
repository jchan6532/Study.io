import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from './contexts/AuthContext';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <CssVarsProvider>
        <App />
      </CssVarsProvider>
    </AuthContextProvider>
  </BrowserRouter>
)