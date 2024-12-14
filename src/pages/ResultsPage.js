import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Button, Box, Divider } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import sampleEvents from "../data/sampleEvents";
import EventCard from "../components/EventCard";
import EventDrawer from "../components/EventDrawer";
import SearchBar from "../components/SearchBar";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import MusicNoteOutlinedIcon from "@mui/icons-material/MusicNoteOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import EmojiObjectsOutlinedIcon from "@mui/icons-material/EmojiObjectsOutlined";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import FavoriteBorderOutlined from "@mui/icons-material/FavoriteBorderOutlined";
import LocalActivityOutlined from "@mui/icons-material/LocalActivityOutlined";
import VolumeUpOutlined from "@mui/icons-material/VolumeUpOutlined";
import BuildOutlined from "@mui/icons-material/BuildOutlined";
import StorefrontOutlined from "@mui/icons-material/StorefrontOutlined";
import LocalShippingOutlined from "@mui/icons-material/LocalShippingOutlined";
import HandshakeOutlined from "@mui/icons-material/HandshakeOutlined";
import HandymanOutlined from "@mui/icons-material/HandymanOutlined";

const categoryIcons = {
  photography: CameraAltOutlinedIcon,
  "wedding services": FavoriteBorderOutlined,
  music: MusicNoteOutlinedIcon,
  entertainment: LocalActivityOutlined,
  "food services": RestaurantOutlinedIcon,
  catering: RestaurantOutlinedIcon,
  "event planning": EventOutlinedIcon,
  coordination: HandshakeOutlined,
  lighting: LightModeOutlinedIcon,
  sound: VolumeUpOutlined,
  decor: EmojiObjectsOutlinedIcon,
  setup: BuildOutlined,
  rentals: StorefrontOutlined,
  equipment: HandymanOutlined,
  transportation: DirectionsCarOutlinedIcon,
  logistics: LocalShippingOutlined,
};

function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [createEventMode, setCreateEventMode] = useState(false);
  const [selectedProviders, setSelectedProviders] = useState([]);
  const [eventName, setEventName] = useState("");
  const [startDate, setStartDateState] = useState(null);
  const [endDate, setEndDateState] = useState(null);

  const params = new URLSearchParams(location.search);
  const query = params.get("query")?.toLowerCase() || "";
  const categoryParam = params.get("category")?.toLowerCase() || "";
  const locationQuery = params.get("location")?.toLowerCase() || "";
  const sd = params.get("startDate") ? new Date(params.get("startDate")) : null;
  const ed = params.get("endDate") ? new Date(params.get("endDate")) : null;
  const initialQuery = params.get("query") || "";
  const initialLocation = params.get("location") || "";
  const initialStartDate = params.get("startDate") ? new Date(params.get("startDate")) : null;
  const initialEndDate = params.get("endDate") ? new Date(params.get("endDate")) : null;

  useEffect(() => {
    setStartDateState(sd);
    setEndDateState(ed);
    const filtered = sampleEvents.filter((event) => {
      const titleMatch = event.title.toLowerCase().includes(query);
      const descriptionMatch = event.description.toLowerCase().includes(query);
      const tagsMatch = event.tags.some((tag) => tag.toLowerCase().includes(query));
      const matchesQuery = query === "" || titleMatch || descriptionMatch || tagsMatch;
      const eventCategoriesLower = event.categories.map((cat) => cat.toLowerCase());
      const matchesCategory = categoryParam === "" || eventCategoriesLower.includes(categoryParam);
      const cityMatch = event.location.city.toLowerCase().includes(locationQuery);
      const stateMatch = event.location.state.toLowerCase().includes(locationQuery);
      const addressMatch = event.location.address.toLowerCase().includes(locationQuery);
      const zipMatch = event.location.zipCode.toLowerCase().includes(locationQuery);
      const matchesLocation = locationQuery === "" || cityMatch || stateMatch || addressMatch || zipMatch;
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
      return matchesQuery && matchesCategory && matchesLocation && dateMatch;
    });
    setFilteredEvents(filtered);
  }, [location.search, query, categoryParam, locationQuery, sd, ed]);

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
  const allCategories = sampleEvents.flatMap((event) => event.categories);
  const uniqueCategories = [...new Set(allCategories.map((cat) => cat.toLowerCase()))];

  const handleCategoryClick = (cat) => {
    const currentParams = new URLSearchParams(location.search);
    if (cat === categoryParam) {
      currentParams.delete("category");
    } else {
      currentParams.set("category", cat);
    }
    navigate(`/results?${currentParams.toString()}`);
  };

  return (
    <Container maxWidth={false} sx={{ maxWidth: "1300px", mt: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ flex: 1, mr: 2 }}>
          <SearchBar initialQuery={initialQuery} initialLocation={initialLocation} initialStartDate={initialStartDate} initialEndDate={initialEndDate} />
        </Box>
        {!createEventMode && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateEventClick}
            sx={{
              ml: 2,
              height: "2.5rem",
              borderRadius: "50px",
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            Create Event
          </Button>
        )}
      </Box>

      <Divider sx={{ mt: 3, mb: 3 }} />

      <Box sx={{ display: "flex", justifyContent: "center", gap: 3, mb: 3, mt: 4, textAlign: "center" }}>
        {uniqueCategories.map((cat) => {
          const Icon = categoryIcons[cat] || CategoryOutlinedIcon;
          const isSelected = cat === categoryParam;
          return (
            <Box
              key={cat}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                "&:hover": {
                  "& svg": { textDecoration: "underline" },
                  "& p": { textDecoration: "underline" },
                },
                ...(isSelected && {
                  "& svg": { fontWeight: "bold", textDecoration: "underline" },
                  "& p": { fontWeight: "bold", textDecoration: "underline" },
                }),
              }}
              onClick={() => handleCategoryClick(cat)}
            >
              <Icon sx={{ fontSize: 24 }} />
              <Typography
                variant="body2"
                sx={{
                  mt: 0.5,
                  fontSize: "0.8rem",
                  fontWeight: isSelected ? "bold" : "normal",
                  textDecoration: isSelected ? "underline" : "none",
                  textTransform: "capitalize",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                }}
              >
                {cat}
              </Typography>
            </Box>
          );
        })}
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
