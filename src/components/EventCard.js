import React from "react";
import { Card, CardActionArea, Button, CardActions, Box, Typography, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import { format } from "date-fns";

function EventCard({ event, createEventMode, onAddProvider }) {
  const formattedStartDate = format(new Date(event.startDate), "MMM d");
  const formattedEndDate = format(new Date(event.endDate), "MMM d");

  const handleAddClick = () => {
    onAddProvider(event);
  };

  const formattedPrice = new Intl.NumberFormat("en-US").format(Math.round(event.price));

  return (
    <Card
      sx={{
        borderRadius: 4,
        boxShadow: "none",
        position: "relative",
        overflow: "visible",
      }}
    >
      <CardActionArea
        component={createEventMode ? "div" : Link}
        to={createEventMode ? undefined : `/events/${event.id}`}
        sx={{
          cursor: createEventMode ? "default" : "pointer",
          display: "block",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: 0,
            paddingTop: "100%",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          <CardMedia
            image={event.image}
            component="div"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "16px",
            }}
          />
        </Box>

        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            mt: 1,
            ml: 1.5,
            mr: 1.5,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              mb: "2px",
              lineHeight: 1.2,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {event.title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: "2px",
              lineHeight: 1.2,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {event.description}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              lineHeight: 1.2,
              textDecoration: "underline",
              fontWeight: "bold",
            }}
          >
            ${formattedPrice} before taxes
          </Typography>
        </Box>
      </CardActionArea>

      {createEventMode && (
        <CardActions sx={{ mt: 1 }}>
          <Button variant="contained" color="success" fullWidth onClick={handleAddClick} sx={{ borderRadius: "0 0 16px 16px" }}>
            Add
          </Button>
        </CardActions>
      )}
    </Card>
  );
}

export default EventCard;
