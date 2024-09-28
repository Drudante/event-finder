import React from "react";
import { Grid, Typography } from "@mui/material";
import EventCard from "./EventCard";

function FeaturedProviders({ events }) {
  return (
    <>
      <Typography variant="h4" gutterBottom sx={{ marginTop: 6, textAlign: "center" }}>
        Featured Providers
      </Typography>
      <Grid container spacing={4} sx={{ marginTop: 2 }}>
        {events.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <EventCard event={event} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default FeaturedProviders;
