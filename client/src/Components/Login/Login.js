import React, { useState } from "react";
import "./Login.css";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { Link, Box, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // function isValidEmail(email) {
  //   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  // }
  function handleEmailChange(event) {
    setEmail(event.target.value);
  }
  const handleLogin = async (e) => {
    const response = await login(email, password);
    if (response.success) {
      console.log("Login successful");
      navigate("/feed");
    } else {
      console.log("Login failed");
    }
  };
  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:6500/api/login", {
        email: email,
        password: password,
      });
      const { token, tokenExpiration, user } = response.data;

      // stocker le token et les infos de l'utilisateur dans localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("tokenExpiration", tokenExpiration);
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  };

  return (
    <div>
      <Container maxWidth="sm">
        <Box className="login__container">
          <h1>Log in</h1>
          <TextField
            id="email-input"
            label="e-mail"
            variant="outlined"
            type="email"
            value={email}
            onChange={handleEmailChange}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            id="outlined-basic"
            label="password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ marginBottom: "10px" }}
            onClick={handleLogin}
            disabled={email === "" || password === ""}
          >
            log in
          </Button>
          <Typography variant="body1">
            Don't have an account?{" "}
            <Link
              component={RouterLink}
              underline="none"
              to="/register"
              color="primary"
            >
              Sign up for free
            </Link>
          </Typography>
        </Box>
      </Container>
    </div>
  );
}
