import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Button, Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import sampleEvents from "../data/sampleEvents";
import EventCard from "../components/EventCard";
import EventDrawer from "../components/EventDrawer";
import SearchBar from "../components/SearchBar";

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

  // Extract the URL parameters again for the search bar's initial values
  const params = new URLSearchParams(location.search);
  const initialQuery = params.get("query") || "";
  const initialLocation = params.get("location") || "";
  const initialStartDate = params.get("startDate") ? new Date(params.get("startDate")) : null;
  const initialEndDate = params.get("endDate") ? new Date(params.get("endDate")) : null;

  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: "1300px",
        mt: 4, // Add margin-top to create space from navbar
      }}
    >
      {/* Search bar and Create Event button aligned on the same row */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ flex: 1, mr: 2 }}>
          <SearchBar initialQuery={initialQuery} initialLocation={initialLocation} initialStartDate={initialStartDate} initialEndDate={initialEndDate} />
        </Box>
        {!createEventMode && (
          <Button variant="contained" color="primary" onClick={handleCreateEventClick} sx={{ ml: 2, height: "2.5rem", borderRadius: "50px", textTransform: "none", fontWeight: "bold" }}>
            Create Event
          </Button>
        )}
      </Box>

      {/* Add margin-top to create equal spacing between search bar and event cards */}
      {filteredEvents.length > 0 ? (
        <Grid container spacing={2} sx={{ mt: 4 }}>
          {filteredEvents.map((event) => (
            <Grid item xs={12} sm={6} md={3} key={event.id}>
              <EventCard event={event} createEventMode={createEventMode} onAddProvider={handleAddProvider} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" sx={{ mt: 4 }}>
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
