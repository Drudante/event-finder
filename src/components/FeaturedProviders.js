// src/components/FeaturedProviders.js
import React from "react";
import { Grid, Typography } from "@mui/material";
import GeneralCategoryCard from "./GeneralCategoryCard";

function FeaturedProviders({ categories }) {
  return (
    <>
      <Typography variant="h4" gutterBottom sx={{ marginTop: 6, textAlign: "center" }}>
        Featured Categories
      </Typography>
      <Grid container spacing={4} sx={{ marginTop: 2 }}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category.title}>
            <GeneralCategoryCard category={category} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default FeaturedProviders;
