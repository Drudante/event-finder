// src/pages/HomePage.js
import React from "react";
import { Container, Box } from "@mui/material";
import SearchBar from "../components/SearchBar";
import Banner from "../components/Banner";
import FeaturedProviders from "../components/FeaturedProviders";
import categories from "../data/categories"; // Import the categories

function HomePage() {
  return (
    <>
      <Banner title="Discover Top Talent for Your Next Event" imageUrl="/images/Website Banner.jpg" />
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", marginTop: 4 }}>
          <SearchBar />
        </Box>
        <FeaturedProviders categories={categories} /> {/* Pass the categories */}
      </Container>
    </>
  );
}

export default HomePage;
