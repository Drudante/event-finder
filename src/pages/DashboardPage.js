import React, { useContext } from "react";
import { Container, Typography, Box } from "@mui/material";
import { AuthContext } from "../contexts/AuthContext";

function DashboardPage() {
  const { currentUser } = useContext(AuthContext);

  return (
    <Container maxWidth="md">
      <Box sx={{ marginTop: 8 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {currentUser?.attributes?.email || "User"}!
        </Typography>
        <Typography variant="body1">This is your dashboard. Here you can manage your profile, view your events, and perform other actions.</Typography>
      </Box>
    </Container>
  );
}

export default DashboardPage;
