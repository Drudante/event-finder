import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Button, Box } from "@mui/material";
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
  const [startDate, setStartDateState] = useState(null);
  const [endDate, setEndDateState] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("query")?.toLowerCase() || "";
    const category = params.get("category")?.toLowerCase() || "";
    const locationQuery = params.get("location")?.toLowerCase() || "";
    const sd = params.get("startDate") ? new Date(params.get("startDate")) : null;
    const ed = params.get("endDate") ? new Date(params.get("endDate")) : null;

    setStartDateState(sd);
    setEndDateState(ed);

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
      if (sd && ed) {
        dateMatch = eventEndDate >= sd && eventStartDate <= ed;
      } else if (sd) {
        dateMatch = eventEndDate >= sd;
      } else if (ed) {
        dateMatch = eventStartDate <= ed;
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
    const savedEvents = JSON.parse(localStorage.getItem("events")) || [];
    savedEvents.push(newEvent);
    localStorage.setItem("events", JSON.stringify(savedEvents));
    alert("Event saved successfully!");
    handleCloseDrawer();
  };

  const handleRemoveProvider = (providerId) => {
    setSelectedProviders((prevProviders) => prevProviders.filter((provider) => provider.id !== providerId));
  };

  const totalCost = selectedProviders.reduce((sum, provider) => sum + provider.price, 0);
  const startDateString = startDate ? startDate.toLocaleDateString() : "Any";
  const endDateString = endDate ? endDate.toLocaleDateString() : "Any";

  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: "1300px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Search Results
          </Typography>
        </Box>
        <Box sx={{ flex: 1, textAlign: "center" }}>
          {(startDate || endDate) && (
            <>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                Event Dates
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 500 }}>
                {startDateString} - {endDateString}
              </Typography>
            </>
          )}
        </Box>
        <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          {!createEventMode && (
            <Button variant="contained" color="primary" onClick={handleCreateEventClick}>
              Create Event
            </Button>
          )}
        </Box>
      </Box>
      {filteredEvents.length > 0 ? (
        <Grid container spacing={2}>
          {filteredEvents.map((event) => (
            <Grid item xs={12} sm={6} md={3} key={event.id}>
              <EventCard event={event} createEventMode={createEventMode} onAddProvider={handleAddProvider} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" sx={{ mt: 2 }}>
          No providers found.
        </Typography>
      )}
      <EventDrawer
        open={createEventMode}
        onClose={handleCloseDrawer}
        eventName={eventName}
        setEventName={setEventName}
        selectedProviders={selectedProviders}
        handleSaveEvent={handleSaveEvent}
        totalCost={totalCost}
        onRemoveProvider={handleRemoveProvider}
      />
    </Container>
  );
}

export default ResultsPage;
