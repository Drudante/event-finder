import React from "react";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";

function CategoryCard({ title, image, subcategories, onClick }) {
  return (
    <Card>
      <CardActionArea onClick={onClick}>
        <CardMedia component="img" height="140" image={image} alt={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {subcategories.join(", ")}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CategoryCard;
