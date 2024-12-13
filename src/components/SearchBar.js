import React, { useState } from "react";
import { TextField, Box, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

function SearchBar({ initialSearchQuery = "", initialLocationQuery = "", initialStartDate = null, initialEndDate = null }) {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [locationQuery, setLocationQuery] = useState(initialLocationQuery);
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.append("query", searchQuery);
    if (locationQuery) params.append("location", locationQuery);
    if (startDate) params.append("startDate", startDate.toISOString());
    if (endDate) params.append("endDate", endDate.toISOString());
    navigate(`/results?${params.toString()}`);
  };

  const textFieldProps = {
    variant: "standard",
    InputProps: {
      disableUnderline: true,
      sx: {
        fontSize: "0.85rem",
        fontWeight: "bold",
        paddingY: 1.2,
        paddingLeft: "1rem",
      },
    },
    InputLabelProps: {
      sx: {
        fontSize: "0.85rem",
        fontWeight: "bold",
        transform: "translate(1rem, 0.8rem)",
      },
    },
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: "999px",
          boxShadow: 3,
          overflow: "hidden",
          border: "1px solid",
          borderColor: "grey.300",
          maxWidth: 1000,
          mx: "auto",
          mt: 2,
          px: 2,
          "& .MuiTextField-root": {
            display: "flex",
            alignItems: "center",
          },
        }}
      >
        <TextField
          {...textFieldProps}
          fullWidth
          label="Search Events"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="e.g., DJ, Catering"
          sx={{
            flex: 1,
            mr: 2,
          }}
        />
        <Box
          sx={{
            width: "1px",
            backgroundColor: "grey.300",
            mx: 1,
            height: "2rem",
          }}
        />
        <TextField
          {...textFieldProps}
          fullWidth
          label="Location"
          value={locationQuery}
          onChange={(e) => setLocationQuery(e.target.value)}
          placeholder="City, State, or Zip"
          sx={{
            flex: 1,
            mr: 2,
          }}
        />
        <Box
          sx={{
            width: "1px",
            backgroundColor: "grey.300",
            mx: 1,
            height: "2rem",
          }}
        />
        <ReactDatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          placeholderText="Start Date"
          customInput={
            <TextField
              {...textFieldProps}
              label="Start Date"
              sx={{
                flex: 1,
                mr: 2,
                cursor: "pointer",
              }}
            />
          }
        />
        <Box
          sx={{
            width: "1px",
            backgroundColor: "grey.300",
            mx: 1,
            height: "2rem",
          }}
        />
        <ReactDatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          placeholderText="End Date"
          customInput={
            <TextField
              {...textFieldProps}
              label="End Date"
              sx={{
                flex: 1,
                mr: 2,
                cursor: "pointer",
              }}
            />
          }
        />
        <Box
          sx={{
            width: "1px",
            backgroundColor: "grey.300",
            mx: 1,
            height: "2rem",
          }}
        />
        <Button
          type="submit"
          startIcon={<SearchIcon />}
          sx={{
            backgroundColor: "primary.main",
            color: "white",
            borderRadius: "50px",
            textTransform: "none",
            px: 2,
            ml: 1,
            fontSize: "0.9rem",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
            height: "2.2rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          Search
        </Button>
      </Box>
    </form>
  );
}

export default SearchBar;
