// src/pages/ResultsPage.js
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Grid, Typography } from "@mui/material";
import sampleEvents from "../data/sampleEvents";
import EventCard from "../components/EventCard";

function ResultsPage() {
  const location = useLocation();
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("query")?.toLowerCase() || "";
    const category = params.get("category")?.toLowerCase() || "";
    const locationQuery = params.get("location")?.toLowerCase() || "";
    const startDate = params.get("startDate") ? new Date(params.get("startDate")) : null;
    const endDate = params.get("endDate") ? new Date(params.get("endDate")) : null;

    const filtered = sampleEvents.filter((event) => {
      // Event search matching
      const titleMatch = event.title.toLowerCase().includes(query);
      const descriptionMatch = event.description.toLowerCase().includes(query);
      const tagsMatch = event.tags.some((tag) => tag.toLowerCase().includes(query));
      const categoryMatch = event.categories.some((cat) => cat.toLowerCase().includes(category));

      // Location matching
      const cityMatch = event.location.city.toLowerCase().includes(locationQuery);
      const stateMatch = event.location.state.toLowerCase().includes(locationQuery);
      const addressMatch = event.location.address.toLowerCase().includes(locationQuery);
      const zipMatch = event.location.zipCode.toLowerCase().includes(locationQuery);

      // Date matching
      const eventStartDate = new Date(event.startDate);
      const eventEndDate = new Date(event.endDate);
      let dateMatch = true;

      if (startDate && endDate) {
        dateMatch = eventEndDate >= startDate && eventStartDate <= endDate;
      } else if (startDate) {
        dateMatch = eventEndDate >= startDate;
      } else if (endDate) {
        dateMatch = eventStartDate <= endDate;
      }

      // Combine search criteria
      const eventMatch = titleMatch || descriptionMatch || tagsMatch || categoryMatch;
      const locationMatch = locationQuery === "" || cityMatch || stateMatch || addressMatch || zipMatch;

      // Return events that match all criteria
      return eventMatch && locationMatch && dateMatch;
    });

    setFilteredEvents(filtered);
  }, [location.search]);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Search Results
      </Typography>
      {filteredEvents.length > 0 ? (
        <Grid container spacing={4}>
          {filteredEvents.map((event) => (
            <Grid item xs={12} sm={6} md={3} key={event.id}>
              <EventCard event={event} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          No events found.
        </Typography>
      )}
    </Container>
  );
}

export default ResultsPage;
