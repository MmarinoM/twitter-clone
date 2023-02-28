import React, { useState } from "react";
import "./Login.css";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { Link, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // function isValidEmail(email) {
  //   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  // }
  function handleEmailChange(event) {
    setEmail(event.target.value);
    console.log(email);
  }
  return (
    <div>
      <Container maxWidth="sm">
        <Box className="login__container">
          <h1>Connexion</h1>
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
          >
            log in
          </Button>
          <Link component={RouterLink} to="/register">
            Register
          </Link>
        </Box>
      </Container>
    </div>
  );
}
