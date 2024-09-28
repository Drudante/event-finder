import React from "react";
import { Grid, Typography } from "@mui/material";
import CategoryCard from "./CategoryCard";

function CategoriesSection({ categories, onCategoryClick }) {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Hire a Provider
      </Typography>
      <Grid container spacing={4}>
        {categories.map((category) => (
          <Grid item xs={12} sm={4} key={category.title}>
            <CategoryCard title={category.title} image={category.image} subcategories={category.subcategories} onClick={() => onCategoryClick(category.title)} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default CategoriesSection;
