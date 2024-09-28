// src/pages/EventDetailsPage.js
import React from "react";
import { useParams } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import sampleEvents from "../data/sampleEvents";

function EventDetailsPage() {
  const { id } = useParams();
  const event = sampleEvents.find((e) => e.id === parseInt(id));

  if (!event) {
    return (
      <Container>
        <Typography variant="h4">Event not found</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {event.title}
      </Typography>
      <Typography variant="body1">{event.description}</Typography>
      {/* Add more details as needed */}
    </Container>
  );
}

export default EventDetailsPage;
