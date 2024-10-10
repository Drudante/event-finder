// src/pages/RegisterPage.js
import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { Auth } from "aws-amplify"; // Correct import
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
        },
      });
      navigate("/login");
    } catch (err) {
      setError(err.message || "Error registering");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 8 }}>
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        {error && (
          <Typography variant="body1" color="error" gutterBottom>
            {error}
          </Typography>
        )}
        <form onSubmit={handleRegister}>
          <TextField label="Email" fullWidth margin="normal" variant="outlined" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <TextField label="Password" fullWidth margin="normal" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <TextField label="Confirm Password" fullWidth margin="normal" variant="outlined" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default RegisterPage;
