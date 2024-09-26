import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box, Stack } from "@mui/material";
import EventCard from "../components/EventCard";
import sampleEvents from "../data/sampleEvents";

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(sampleEvents);

  const handleSearch = () => {
    const filtered = sampleEvents.filter((event) => {
      const query = searchQuery.toLowerCase();

      const titleMatch = event.title.toLowerCase().includes(query);
      const descriptionMatch = event.description.toLowerCase().includes(query);
      const cityMatch = event.location.city.toLowerCase().includes(query);
      const stateMatch = event.location.state.toLowerCase().includes(query);
      const addressMatch = event.location.address.toLowerCase().includes(query);
      const zipMatch = event.location.zipCode.toLowerCase().includes(query);

      return titleMatch || descriptionMatch || cityMatch || stateMatch || addressMatch || zipMatch;
    });

    setFilteredEvents(filtered);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Search for Events and Services
      </Typography>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
        <TextField
          fullWidth
          label="Search..."
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </Stack>

      {filteredEvents.length > 0 ? (
        <Box sx={{ marginTop: 2 }}>
          <Stack spacing={2}>
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </Stack>
        </Box>
      ) : (
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          No events found.
        </Typography>
      )}
    </Container>
  );
}

export default SearchPage;
