import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Button, Drawer, TextField, Box, List, ListItem, ListItemText } from "@mui/material";
import { useLocation } from "react-router-dom";
import sampleEvents from "../data/sampleEvents";
import EventCard from "../components/EventCard";
import EventDrawer from "../components/EventDrawer";

function ResultsPage() {
  const location = useLocation();
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [createEventMode, setCreateEventMode] = useState(false);
  const [selectedProviders, setSelectedProviders] = useState([]);
  const [eventName, setEventName] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("query")?.toLowerCase() || "";
    const category = params.get("category")?.toLowerCase() || "";
    const locationQuery = params.get("location")?.toLowerCase() || "";
    const startDate = params.get("startDate") ? new Date(params.get("startDate")) : null;
    const endDate = params.get("endDate") ? new Date(params.get("endDate")) : null;

    const filtered = sampleEvents.filter((event) => {
      const titleMatch = event.title.toLowerCase().includes(query);
      const descriptionMatch = event.description.toLowerCase().includes(query);
      const tagsMatch = event.tags.some((tag) => tag.toLowerCase().includes(query));
      const categoryMatch = event.categories.some((cat) => cat.toLowerCase().includes(category));

      const cityMatch = event.location.city.toLowerCase().includes(locationQuery);
      const stateMatch = event.location.state.toLowerCase().includes(locationQuery);
      const addressMatch = event.location.address.toLowerCase().includes(locationQuery);
      const zipMatch = event.location.zipCode.toLowerCase().includes(locationQuery);

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

      const eventMatch = titleMatch || descriptionMatch || tagsMatch || categoryMatch;
      const locationMatch = locationQuery === "" || cityMatch || stateMatch || addressMatch || zipMatch;

      return eventMatch && locationMatch && dateMatch;
    });

    setFilteredEvents(filtered);
  }, [location.search]);

  const handleCreateEventClick = () => {
    setCreateEventMode(true);
  };

  const handleAddProvider = (event) => {
    if (selectedProviders.find((provider) => provider.id === event.id)) {
      alert("Provider is already added.");
      return;
    }
    setSelectedProviders((prevProviders) => [...prevProviders, event]);
  };

  const handleCloseDrawer = () => {
    setCreateEventMode(false);
    setSelectedProviders([]);
    setEventName("");
  };

  const handleSaveEvent = () => {
    if (!eventName) {
      alert("Please enter an event name.");
      return;
    }

    const newEvent = {
      name: eventName,
      providers: selectedProviders,
    };

    // Save event logic (send to backend or store locally)
    const savedEvents = JSON.parse(localStorage.getItem("events")) || [];
    savedEvents.push(newEvent);
    localStorage.setItem("events", JSON.stringify(savedEvents));

    alert("Event saved successfully!");
    handleCloseDrawer();
  };

  const totalCost = selectedProviders.reduce((sum, provider) => sum + provider.price, 0);

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginY: 2,
        }}
      >
        <Typography variant="h4">Search Results</Typography>
        {!createEventMode && (
          <Button variant="contained" color="primary" onClick={handleCreateEventClick}>
            Create Event
          </Button>
        )}
      </Box>
      {filteredEvents.length > 0 ? (
        <Grid container spacing={4}>
          {filteredEvents.map((event) => (
            <Grid item xs={12} sm={6} md={3} key={event.id}>
              <EventCard event={event} createEventMode={createEventMode} onAddProvider={handleAddProvider} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          No providers found.
        </Typography>
      )}
      <EventDrawer open={createEventMode} onClose={handleCloseDrawer} eventName={eventName} setEventName={setEventName} selectedProviders={selectedProviders} handleSaveEvent={handleSaveEvent} totalCost={totalCost} />
    </Container>
  );
}

export default ResultsPage;
