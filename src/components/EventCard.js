import React from "react";
import { Card, CardContent, CardMedia, Typography, CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";
import { format } from "date-fns";

function EventCard({ event }) {
  const formattedStartDate = format(new Date(event.startDate), "MMMM d, yyyy");
  const formattedEndDate = format(new Date(event.endDate), "MMMM d, yyyy");

  return (
    <Card>
      <CardActionArea component={Link} to={`/events/${event.id}`}>
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
    </Card>
  );
}

export default EventCard;
