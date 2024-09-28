import React from "react";
import { Container, Box } from "@mui/material";
import SearchBar from "../components/SearchBar";
import Banner from "../components/Banner";
import CategoriesSection from "../components/CategoriesSection";

function SearchPage() {
  const categories = [
    {
      title: "Music",
      image: "/images/category-music.jpg",
      subcategories: ["DJ Services", "Live Bands", "Solo Artists"],
    },
    {
      title: "Catering",
      image: "/images/category-catering.jpg",
      subcategories: ["Wedding Catering", "Corporate Catering", "Personal Chef"],
    },
    {
      title: "Entertainment",
      image: "/images/category-entertainment.jpg",
      subcategories: ["Magicians", "Clowns", "Event Hosts"],
    },
  ];

  const handleCategoryClick = (category) => {
    // Navigate to results page with category filter
  };

  return (
    <>
      <Banner title="Find a Provider in Your Area" imageUrl="/images/Website Banner.jpg" />

      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", marginTop: 4 }}>
          <SearchBar />
        </Box>

        <CategoriesSection categories={categories} onCategoryClick={handleCategoryClick} />
      </Container>
    </>
  );
}

export default SearchPage;
