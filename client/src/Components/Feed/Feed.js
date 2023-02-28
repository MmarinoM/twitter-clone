import React, { useEffect } from "react";
// import axios from "axios";
import "./Feed.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function Feed() {
  useEffect(() => {
    console.log("useLayoutEffect");
    const token = localStorage.getItem("token");
    const tokenExpiration = new Date(localStorage.getItem("tokenExpiration"));
    const now = new Date();

    if (!token || !tokenExpiration) {
      navigate("/login");
    }

    if (now > tokenExpiration) {
      navigate("/login");
    }
  }, []);
  let user = localStorage.getItem("user");
  user = JSON.parse(user);
  const navigate = useNavigate();

  const disconnect = () => {
    console.log("disconnect");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("tokenExpiration");
    navigate("/login");
  };

  return (
    <div>
      <h2> you're logged in</h2>
      <Button
        variant="outlined"
        onClick={disconnect}
        style={{ marginBottom: "10px" }}
        color="error"
      >
        Disconect
      </Button>
    </div>
  );
}
