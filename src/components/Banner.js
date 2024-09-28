import React from "react";
import { Box, Typography } from "@mui/material";
import { keyframes } from "@emotion/react";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

function Banner({ title, imageUrl }) {
  return (
    <Box
      sx={{
        height: "400px",
        backgroundImage: "url('/images/Website Banner.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        animation: `${fadeIn} 1.5s ease-out`,
        borderRadius: 2,
        marginBottom: 4,
      }}
    >
      <Typography variant="h2" component="h1" sx={{ color: "white", fontWeight: "bold", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)" }}>
        Discover Top Talent for Your Next Event
      </Typography>
    </Box>
  );
}

export default Banner;
