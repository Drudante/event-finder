// src/pages/SearchPage.js
import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box, Stack } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import AdapterDateFns from "@date-io/date-fns";
import EventCard from "../components/EventCard";
import sampleEvents from "../data/sampleEvents";

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState(sampleEvents);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const location = locationQuery.toLowerCase();

    const filtered = sampleEvents.filter((event) => {
      // Event search matching
      const titleMatch = event.title.toLowerCase().includes(query);
      const descriptionMatch = event.description.toLowerCase().includes(query);
      const tagsMatch = event.tags.some((tag) => tag.toLowerCase().includes(query));

      // Location matching
      const cityMatch = event.location.city.toLowerCase().includes(location);
      const stateMatch = event.location.state.toLowerCase().includes(location);
      const addressMatch = event.location.address.toLowerCase().includes(location);
      const zipMatch = event.location.zipCode.toLowerCase().includes(location);

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
      const eventMatch = titleMatch || descriptionMatch || tagsMatch;
      const locationMatch = location === "" || cityMatch || stateMatch || addressMatch || zipMatch;

      // Return events that match all criteria
      return eventMatch && locationMatch && dateMatch;
    });

    setFilteredEvents(filtered);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Search for Events and Services
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
            {/* Event Search Input */}
            <TextField fullWidth label="Search Events" placeholder="e.g., Music Festival" variant="outlined" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            {/* Location Input */}
            <TextField fullWidth label="Location" placeholder="City, State, or Zip" variant="outlined" value={locationQuery} onChange={(e) => setLocationQuery(e.target.value)} />
            {/* Start Date Input */}
            <DatePicker label="Start Date" value={startDate} onChange={(newValue) => setStartDate(newValue)} renderInput={(params) => <TextField {...params} fullWidth />} />
            {/* End Date Input */}
            <DatePicker label="End Date" value={endDate} onChange={(newValue) => setEndDate(newValue)} renderInput={(params) => <TextField {...params} fullWidth />} />
            {/* Search Button */}
            <Button type="submit" variant="contained" color="primary">
              Search
            </Button>
          </Stack>
        </form>
      </LocalizationProvider>

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
