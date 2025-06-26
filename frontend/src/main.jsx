import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from 'react'
import { BrowserRouter } from "react-router";
import  AuthContextProvider  from './context/AuthContext.jsx'
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>,
);
