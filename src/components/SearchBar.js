import React, { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import AdapterDateFns from "@date-io/date-fns";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.append("query", searchQuery);
    if (locationQuery) params.append("location", locationQuery);
    if (startDate) params.append("startDate", startDate.toISOString());
    if (endDate) params.append("endDate", endDate.toISOString());

    navigate(`/results?${params.toString()}`);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
          <TextField fullWidth label="Search Events" placeholder="e.g., DJ, Catering" variant="outlined" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <TextField fullWidth label="Location" placeholder="City, State, or Zip" variant="outlined" value={locationQuery} onChange={(e) => setLocationQuery(e.target.value)} />
          <DatePicker label="Start Date" value={startDate} onChange={(newValue) => setStartDate(newValue)} renderInput={(params) => <TextField {...params} fullWidth />} />
          <DatePicker label="End Date" value={endDate} onChange={(newValue) => setEndDate(newValue)} renderInput={(params) => <TextField {...params} fullWidth />} />
          <Button type="submit" variant="contained" color="primary">
            Search
          </Button>
        </Stack>
      </form>
    </LocalizationProvider>
  );
}

export default SearchBar;
