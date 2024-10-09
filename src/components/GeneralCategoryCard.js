// src/components/GeneralCategoryCard.js
import React from "react";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function GeneralCategoryCard({ category }) {
  return (
    <Card>
      <CardActionArea component={Link} to={`/categories/${category.title}`}>
        <CardMedia component="img" height="140" image={category.image} alt={category.title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {category.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {category.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default GeneralCategoryCard;
