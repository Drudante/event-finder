import React from "react";
import { Card, CardActionArea, IconButton, CardActions, Box, Typography, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import AddIcon from "@mui/icons-material/Add";

function EventCard({ event, createEventMode, onAddProvider }) {
  const formattedStartDate = format(new Date(event.startDate), "MMM d");
  const formattedEndDate = format(new Date(event.endDate), "MMM d");
  const handleAddClick = () => {
    onAddProvider(event);
  };
  const formattedPrice = new Intl.NumberFormat("en-US").format(Math.round(event.price));
  const categoryText = event.categories.join(" | ");
  let ratingValue = null;
  for (const tag of event.tags) {
    if (tag.toLowerCase().startsWith("rating:")) {
      const parts = tag.split(":");
      if (parts.length === 2) {
        ratingValue = parseFloat(parts[1]);
        break;
      }
    }
  }

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
            paddingTop: "66.6667%",
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
        <Box sx={{ position: "relative", zIndex: 1, mt: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography
              variant="body2"
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
            {ratingValue && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "bold",
                    color: "black",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  ★ {ratingValue.toFixed(2)}
                </Typography>
              </Box>
            )}
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              lineHeight: 1.2,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {categoryText}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              mt: 1,
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
        <CardActions sx={{ mt: 1, justifyContent: "center" }}>
          <IconButton
            onClick={handleAddClick}
            size="small"
            sx={{
              color: "text.primary",
              transition: "color 0.2s",
              "&:hover": {
                color: "primary.main",
              },
            }}
          >
            <AddIcon fontSize="large" />
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
}

export default EventCard;
