import React from "react";
import { Card, CardContent, CardMedia, Typography, CardActionArea, Button, CardActions } from "@mui/material";
import { Link } from "react-router-dom";
import { format } from "date-fns";

function EventCard({ event, createEventMode, onAddProvider }) {
  const formattedStartDate = format(new Date(event.startDate), "MMMM d, yyyy");
  const formattedEndDate = format(new Date(event.endDate), "MMMM d, yyyy");

  const handleAddClick = () => {
    onAddProvider(event);
  };

  return (
    <Card>
      <CardActionArea component={createEventMode ? "div" : Link} to={createEventMode ? undefined : `/events/${event.id}`} sx={{ cursor: createEventMode ? "default" : "pointer" }}>
        <CardMedia component="img" height="140" image={event.image} alt={event.title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {event.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {event.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Location: {event.location.city}, {event.location.state}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Dates: {formattedStartDate} - {formattedEndDate}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: ${event.price.toFixed(2)}
          </Typography>
        </CardContent>
      </CardActionArea>
      {createEventMode && (
        <CardActions>
          <Button variant="contained" color="success" fullWidth onClick={handleAddClick}>
            Add
          </Button>
        </CardActions>
      )}
    </Card>
  );
}

export default EventCard;
