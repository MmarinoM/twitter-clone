import React, { useState } from "react";
import axios from "axios";
import "./SignUp.css";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { Link, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }
  const handleSignUp = () => {
    //handle error too
    axios
      .post("http://localhost:6500/api/signup", {
        name: username,
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        if (error.response.status === 409) {
          setEmailError(true);
        } else {
          console.log("Une erreur est survenue");
        }
      });
  };

  return (
    <div>
      <Container maxWidth="sm">
        <Box className="login__container">
          <h1>Create an account</h1>
          <TextField
            id="email-input"
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={handleEmailChange}
            style={{ marginBottom: "10px" }}
            error={emailError}
            helperText={emailError ? "Email already exists" : ""}
          />
          <TextField
            id="username-input"
            label="Username"
            variant="outlined"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
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
            onClick={handleSignUp}
            disabled={email === "" || password === "" || username === ""}
          >
            Create account
          </Button>
          <Link component={RouterLink} to="/register">
            Register
          </Link>
        </Box>
      </Container>
    </div>
  );
}
