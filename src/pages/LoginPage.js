// src/pages/LoginPage.js
import React, { useState, useContext } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { Auth } from "aws-amplify"; // Correct import
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setCurrentUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const user = await Auth.signIn(email, password);
      setCurrentUser(user);
      navigate("/");
    } catch (err) {
      setError(err.message || "Error logging in");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 8 }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        {error && (
          <Typography variant="body1" color="error" gutterBottom>
            {error}
          </Typography>
        )}
        <form onSubmit={handleLogin}>
          <TextField label="Email" fullWidth margin="normal" variant="outlined" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <TextField label="Password" fullWidth margin="normal" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default LoginPage;
