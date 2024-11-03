import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { Auth } from "aws-amplify";
import { useNavigate, useLocation } from "react-router-dom";

function ConfirmSignUpPage() {
  const [username, setUsername] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (location.state && location.state.username) {
      setUsername(location.state.username);
    }
  }, [location.state]);

  const handleConfirmSignUp = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await Auth.confirmSignUp(username, confirmationCode);
      navigate("/login");
    } catch (err) {
      setError(err.message || "Error confirming sign up");
    }
  };

  const handleResendCode = async () => {
    setError("");

    try {
      await Auth.resendSignUp(username);
      alert("Confirmation code resent successfully");
    } catch (err) {
      setError(err.message || "Error resending confirmation code");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 8 }}>
        <Typography variant="h4" gutterBottom>
          Confirm Your Account
        </Typography>
        {error && (
          <Typography variant="body1" color="error" gutterBottom>
            {error}
          </Typography>
        )}
        <form onSubmit={handleConfirmSignUp}>
          <TextField label="Username" fullWidth margin="normal" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <TextField label="Confirmation Code" fullWidth margin="normal" variant="outlined" value={confirmationCode} onChange={(e) => setConfirmationCode(e.target.value)} required />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
            Confirm Account
          </Button>
        </form>
        <Button variant="text" color="primary" fullWidth sx={{ marginTop: 2 }} onClick={handleResendCode}>
          Resend Confirmation Code
        </Button>
      </Box>
    </Container>
  );
}

export default ConfirmSignUpPage;
