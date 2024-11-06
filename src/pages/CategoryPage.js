import React from "react";
import { useParams } from "react-router-dom";
import { Container, Grid, Typography } from "@mui/material";
import sampleEvents from "../data/sampleEvents";
import EventCard from "../components/EventCard";

function CategoryPage() {
  const { category } = useParams();

  const filteredEvents = sampleEvents.filter((event) => {
    return event.categories && event.categories.some((cat) => cat.toLowerCase() === category.toLowerCase());
  });

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom sx={{ marginTop: 6, textAlign: "center" }}>
        {category} Services
      </Typography>
      {filteredEvents.length > 0 ? (
        <Grid container spacing={4} sx={{ marginTop: 2 }}>
          {filteredEvents.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <EventCard event={event} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" sx={{ textAlign: "center", marginTop: 6 }}>
          No providers found in this category.
        </Typography>
      )}
    </Container>
  );
}

export default CategoryPage;
