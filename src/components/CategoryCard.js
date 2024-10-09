import React from "react";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function CategoryCard({ title, image, subcategories }) {
  const navigate = useNavigate();

  const handleCategoryClick = () => {
    navigate(`/categories/${title}`);
  };

  return (
    <Card>
      <CardActionArea onClick={handleCategoryClick}>
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
