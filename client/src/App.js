import "./App.css";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Route, Navigate, Routes } from "react-router-dom";
import { useState } from "react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [isLogged, setIsLogged] = useState(false);
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={isLogged ? "" : <Navigate to="/login" />} />
        <Route path="/register" element={<SignUp />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
