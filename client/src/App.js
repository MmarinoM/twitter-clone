import "./App.css";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import Feed from "./Components/Feed/Feed";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Route, Navigate, Routes } from "react-router-dom";
import { useState, useLayoutEffect } from "react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const isAuth = () => {
    const token = localStorage.getItem("token");
    const tokenExpiration = new Date(localStorage.getItem("tokenExpiration"));
    const now = new Date();

    if (!token || !tokenExpiration) {
      return false;
    }

    return now < tokenExpiration;
  };

  useLayoutEffect(() => {
    if (isAuth()) {
      setIsLogged(true);
    }
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            isLogged ? <Navigate to="/feed" /> : <Navigate to="/login" />
          }
        />
        <Route path="/register" element={<SignUp />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
